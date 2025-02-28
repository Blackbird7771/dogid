from pydantic import BaseModel, Field
from typing import List, Optional

class BreedPrediction(BaseModel):
    """
    Represents a single breed prediction with confidence score.
    """
    breed: str = Field(..., description="The predicted dog breed")
    confidence: float = Field(..., description="Confidence score (0-1)")
    
class PredictionResponse(BaseModel):
    """
    Response model for breed prediction endpoint.
    """
    top_prediction: BreedPrediction = Field(..., description="The most likely breed prediction")
    alternative_predictions: List[BreedPrediction] = Field(
        default_factory=list,
        description="Other possible breed predictions with lower confidence scores"
    ) 