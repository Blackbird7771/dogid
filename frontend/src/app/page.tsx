'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import BreedResult from '@/components/ui/BreedResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setError(null);
    setResults(null);
  };

  const handleReset = () => {
    setFile(null);
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setResults(null);
    setError(null);
  };

  const analyzeImage = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">What breed is my dog?</h1>
        <h6 className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of your dog and let the AI identify the breed.
        </h6>
      </div>

      {/* Main Content */}
      <div className="card">
        {!file ? (
          <div className="upload-area">
            <div className="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Upload your dog photo</h3>
            <p className="text-muted-foreground mb-4">Drag and drop or click to browse</p>
            <p className="text-sm text-muted-foreground mb-6">JPG, JPEG, or PNG (max. 5MB)</p>
            <FileUpload
              onFileSelect={handleFileSelect}
              accept="image/*"
              maxSizeMB={5}
            />
          </div>
        ) : (
          <div className="p-4">
            {fileUrl && (
              <div className="mb-6 flex justify-center">
                <img 
                  src={fileUrl} 
                  alt="Dog preview" 
                  className="max-h-80 rounded-lg shadow-sm" 
                />
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button 
                className="btn btn-primary"
                onClick={analyzeImage}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Analyzing...
                  </>
                ) : 'Scan'}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={isAnalyzing}
              >
                Reset
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      {(isAnalyzing || results) && (
        <div className="card mt-8">
          {isAnalyzing ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-muted-foreground">Analyzing your dog image...</p>
              </div>
            </div>
          ) : results ? (
            <BreedResult
              topPrediction={results.topPrediction}
              alternativePredictions={results.alternativePredictions}
            />
          ) : null}
        </div>
      )}

      {/* Tips Section */}
      <div className="tips-section">
        <h2 className="text-2xl font-semibold mb-4">Tips to Get the Best Out of Dog Breed AI</h2>
        <h6 className="text-base text-muted-foreground mb-6">
          Maximize the accuracy of the dog breed detection with these simple steps.
        </h6>
        
        <div className="tips-grid">
          <div className="tip-card">
            <h5>Use Good Lighting</h5>
            <p>
              Ensure your dog is well-lit, with even lighting to avoid shadows that might obscure its features. 
              Natural daylight is best, ideally with your dog facing toward the light source.
            </p>
          </div>
          
          <div className="tip-card">
            <h5>Frontal Pose</h5>
            <p>
              Capture the image with your dog's face directly facing the camera. 
              This position allows for accurate breed analysis.
            </p>
          </div>
          
          <div className="tip-card">
            <h5>Single Dog Only</h5>
            <p>
              Make sure only one dog is in the image to avoid confusion in the breed determination process. 
              Multiple dogs in the photo can lead to inaccurate results.
            </p>
          </div>
          
          <div className="tip-card">
            <h5>Avoid Obstructions</h5>
            <p>
              Ensure that nothing is covering your dog's key features. 
              Accessories like collars and bandanas should be minimal to not obscure any identifying traits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
