from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from app.core.prediction import predict_breed
from app.core.image_processing import process_image
from app.models.schemas import PredictionResponse
from app.core.cache import get_cache_client, get_from_cache, store_in_cache
import hashlib
import base64
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/predict", response_model=PredictionResponse)
async def predict(
    file: UploadFile = File(...),
    cache_client = Depends(get_cache_client)
):
    """
    Predict the dog breed from an uploaded image.
    
    The image is processed and passed to the AI model for prediction.
    Results are cached to improve performance for repeated requests.
    """
    try:
        # Read and validate image
        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file")
        
        # Generate cache key from image content
        image_hash = hashlib.md5(contents).hexdigest()
        
        # Check cache first
        cached_result = await get_from_cache(cache_client, image_hash)
        if cached_result:
            logger.info(f"Cache hit for image: {image_hash}")
            return cached_result
        
        # Process image for prediction
        processed_image = await process_image(contents)
        
        # Get prediction from model
        predictions = await predict_breed(processed_image)
        
        # Create response
        response = PredictionResponse(
            top_prediction=predictions[0],
            alternative_predictions=predictions[1:5] if len(predictions) > 1 else []
        )
        
        # Store in cache
        await store_in_cache(cache_client, image_hash, response)
        
        return response
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.get("/health")
async def health_check():
    """
    API health check endpoint.
    """
    return {"status": "healthy"} 