import { NextResponse } from 'next/server';

// Configure your backend URL in environment variables in production
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }
    
    // Forward the request to our backend service
    const backendResponse = await fetch(`${BACKEND_API_URL}/predict`, {
      method: 'POST',
      body: formData,
    });
    
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.detail || 'Failed to analyze image' },
        { status: backendResponse.status }
      );
    }
    
    // Get the results from the backend service
    const data = await backendResponse.json();
    
    // Return the results to the client
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error forwarding to backend:', error);
    
    // If the backend is not available, use the mock data for demonstration
    // In production, this would be removed and proper error handling implemented
    if ((error as Error).message.includes('ECONNREFUSED') || (error as Error).message.includes('fetch failed')) {
      console.log('Using mock data since backend is not available');
      
      // Simulate a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for demo when backend is not available
      const mockResults = {
        topPrediction: {
          breed: 'Golden Retriever',
          confidence: 0.92,
        },
        alternativePredictions: [
          { breed: 'Labrador Retriever', confidence: 0.05 },
          { breed: 'Nova Scotia Duck Tolling Retriever', confidence: 0.02 },
          { breed: 'Flat-Coated Retriever', confidence: 0.01 },
        ]
      };
      
      return NextResponse.json(mockResults);
    }
    
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
} 