import io
import numpy as np
from PIL import Image
import logging
from fastapi import HTTPException

logger = logging.getLogger(__name__)

# Model input dimensions
IMG_SIZE = 224  # Standard size for MobileNet/EfficientNet

async def process_image(image_bytes):
    """
    Process an image for model prediction.
    
    Args:
        image_bytes: Raw image bytes
        
    Returns:
        Processed numpy array ready for model inference
    """
    try:
        # Open image from bytes
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB (in case of PNG with alpha channel or other formats)
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Resize to model input size
        image = image.resize((IMG_SIZE, IMG_SIZE))
        
        # Convert to numpy array and normalize
        img_array = np.array(image).astype(np.float32)
        
        # Normalize to [0,1]
        img_array = img_array / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
        
    except Exception as e:
        logger.error(f"Image processing error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}") 