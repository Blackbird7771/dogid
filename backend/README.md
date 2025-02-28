# Dog Breed Identification Backend API

This is the backend service for the Dog Breed Identification application. It provides an API for identifying dog breeds from uploaded images using a machine learning model.

## Requirements

- Python 3.8 or higher
- Required Python packages (see `requirements.txt`)

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Download the model (in a production environment):
   - For this demo, we're using a mock model. In a real application, you would need to download a pre-trained model.
   - You would typically place the model in a `/models` directory.

## Running the Service

To start the backend service:

```bash
python main.py
```

Or use uvicorn directly:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Root Endpoint

- **URL**: `/`
- **Method**: GET
- **Description**: Check if the API is running.
- **Response**:
  ```json
  {
    "message": "Dog Breed Identification API is running. Use POST /predict to identify dog breeds."
  }
  ```

### Predict Endpoint

- **URL**: `/predict`
- **Method**: POST
- **Description**: Upload an image and get dog breed predictions.
- **Request**:
  - Form data with a file field named "file" containing the image (JPG, JPEG, or PNG).
- **Response**:
  ```json
  {
    "topPrediction": {
      "breed": "Golden Retriever",
      "confidence": 0.92
    },
    "alternativePredictions": [
      {
        "breed": "Labrador Retriever",
        "confidence": 0.05
      },
      {
        "breed": "Nova Scotia Duck Tolling Retriever",
        "confidence": 0.02
      },
      {
        "breed": "Flat-Coated Retriever",
        "confidence": 0.01
      }
    ]
  }
  ```

## Integrating with the Frontend

The frontend application calls this API to process dog images. The API accepts image uploads and returns breed predictions in a format that matches the frontend's expected data structure.

## Deployment

For production deployment, consider:

1. Using a production WSGI server (like Gunicorn)
2. Setting up proper CORS restrictions
3. Implementing rate limiting
4. Adding authentication
5. Using environment variables for configuration

Example deployment using Gunicorn:

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Note on the Model

In a production environment, you would use an actual trained model. This could be:

1. A model you've trained yourself using datasets like Stanford Dogs or ImageNet
2. A pre-trained model fine-tuned for dog breed classification
3. A model from a model repository

Popular architectures for this task include ResNet, MobileNet, or EfficientNet variants. 