import os
import numpy as np
import onnxruntime as ort
import logging
from app.models.schemas import BreedPrediction
from typing import List
import aiofiles
import json

logger = logging.getLogger(__name__)

# Path to the ONNX model file
MODEL_PATH = os.getenv("MODEL_PATH", "app/models/dog_breed_model.onnx")

# Path to the breed labels file
LABELS_PATH = os.getenv("LABELS_PATH", "app/models/dog_breed_labels.json")

# Lazy-loaded model and labels
_model = None
_labels = None

async def _load_model():
    """
    Load the ONNX model for inference.
    """
    global _model
    if _model is None:
        try:
            # Check if model file exists
            if not os.path.exists(MODEL_PATH):
                logger.warning(f"Model file not found at {MODEL_PATH}. Using dummy model.")
                _model = DummyModel()
                return _model
                
            # Create ONNX Runtime session
            _model = ort.InferenceSession(MODEL_PATH)
            logger.info(f"Model loaded successfully from {MODEL_PATH}")
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}. Using dummy model.")
            _model = DummyModel()
    
    return _model

async def _load_labels():
    """
    Load breed labels from JSON file.
    """
    global _labels
    if _labels is None:
        try:
            # Check if labels file exists
            if not os.path.exists(LABELS_PATH):
                logger.warning(f"Labels file not found at {LABELS_PATH}. Using dummy labels.")
                _labels = ["Labrador Retriever", "German Shepherd", "Golden Retriever", 
                          "Bulldog", "Beagle", "Poodle", "Rottweiler", "Yorkshire Terrier", 
                          "Boxer", "Dachshund"]
                return _labels
                
            # Load labels from file
            async with aiofiles.open(LABELS_PATH, mode='r') as f:
                content = await f.read()
                _labels = json.loads(content)
                
            logger.info(f"Labels loaded successfully from {LABELS_PATH}")
        except Exception as e:
            logger.error(f"Failed to load labels: {str(e)}. Using dummy labels.")
            _labels = ["Labrador Retriever", "German Shepherd", "Golden Retriever", 
                      "Bulldog", "Beagle", "Poodle", "Rottweiler", "Yorkshire Terrier", 
                      "Boxer", "Dachshund"]
    
    return _labels

async def predict_breed(image_array) -> List[BreedPrediction]:
    """
    Predict dog breed from preprocessed image.
    
    Args:
        image_array: Preprocessed image as numpy array
        
    Returns:
        List of BreedPrediction objects sorted by confidence (highest first)
    """
    # Load model and labels
    model = await _load_model()
    labels = await _load_labels()
    
    # Get predictions
    if isinstance(model, DummyModel):
        # Use dummy model for testing/development
        predictions = model.run(None, {"input": image_array})
    else:
        # Use real ONNX model
        predictions = model.run(None, {"input": image_array})
    
    # Process predictions
    scores = predictions[0][0]
    
    # Create breed predictions
    breed_predictions = []
    for i, score in enumerate(scores):
        if i < len(labels):
            breed_predictions.append(
                BreedPrediction(
                    breed=labels[i],
                    confidence=float(score)
                )
            )
    
    # Sort by confidence (highest first)
    breed_predictions.sort(key=lambda x: x.confidence, reverse=True)
    
    return breed_predictions

class DummyModel:
    """
    A dummy model for development/testing when the real model is not available.
    """
    def __init__(self):
        logger.warning("Using dummy model for predictions")
    
    def run(self, output_names, input_feed):
        """
        Generate random predictions for testing.
        """
        # Generate 10 random scores
        scores = np.random.rand(1, 10).astype(np.float32)
        
        # Normalize to sum to 1
        scores = scores / np.sum(scores)
        
        return [scores] 