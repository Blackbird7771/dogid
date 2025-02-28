# Dog Breed Identifier (DogID)

A web application that uses machine learning to identify dog breeds from uploaded photos. Simply upload a photo of a dog, and our AI will tell you the most likely breed along with alternative matches.

## Project Structure

This project consists of two main parts:

- **Frontend**: A Next.js web application with a modern UI
- **Backend**: A Python FastAPI service with a CNN model for dog breed identification

```
├── frontend/           # Next.js frontend application
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   │   ├── app/        # Next.js app router pages
│   │   ├── components/ # React components
│   │   └── lib/        # Utility functions
│   └── ...
├── backend/            # Python API server with CNN model
│   ├── main.py         # FastAPI application with MobileNetV2
│   ├── Dockerfile      # Container configuration for deployment
│   ├── fly.toml        # Fly.io configuration
│   ├── requirements.txt # Python dependencies
│   └── ...
└── README.md           # This file
```

## Features

- Upload dog photos through drag-and-drop or file selection
- CNN-powered breed identification with MobileNetV2 architecture
- Get breed predictions with confidence scores
- View alternative breed matches
- Responsive design that works on mobile and desktop
- Clean, modern UI with smooth animations

## Technology Stack

### Frontend

- **Next.js** - React framework for server-rendered applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - SVG icon collection

### Backend

- **FastAPI** - Modern, fast Python web framework
- **TensorFlow** - Machine learning framework with MobileNetV2 CNN
- **Python** - Backend programming language
- **Fly.io** - Deployment platform for the backend
- **Uvicorn** - ASGI server

## Machine Learning Implementation

The dog breed identification system uses a Convolutional Neural Network (CNN) based on MobileNetV2:

- **Base Model**: MobileNetV2 pre-trained on ImageNet for feature extraction
- **Image Processing**: Standardized resizing and normalization for consistent model input
- **Prediction Pipeline**: Fast and efficient image processing and breed prediction
- **Supported Breeds**: Over 120 dog breeds can be identified

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Git
- Fly.io CLI (for backend deployment)

### Installation

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```
   # .env.local
   BACKEND_API_URL=https://your-fly-app-name.fly.dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

#### Backend

See the `backend/DEPLOY.md` file for detailed deployment instructions to Fly.io.

## Deployment

### Frontend

You can deploy the frontend to platforms like Vercel or Netlify:

```bash
# For Vercel
vercel

# For Netlify
netlify deploy
```

### Backend

The backend is deployed to Fly.io. See `backend/DEPLOY.md` for detailed instructions.

Quick deployment:

```bash
cd backend
fly launch
fly deploy
```

## Future Improvements

- Fine-tune the CNN model on a larger dataset of dog breeds
- Add user accounts to save and track previous breed identifications
- Implement transfer learning to improve model accuracy
- Add multi-language support
- Implement PWA features for offline support
- Add comparison features between different dog breeds

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Stanford Dogs Dataset for training data
- The TensorFlow and fastai communities for model architecture guidance
- MobileNetV2 paper authors for the CNN architecture
- All contributors who have helped improve this project 