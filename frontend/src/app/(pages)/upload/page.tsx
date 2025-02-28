'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '@/components/ui/FileUpload';
import Button from '@/components/ui/Button';
import BreedResult, { BreedPrediction } from '@/components/ui/BreedResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    topPrediction: BreedPrediction;
    alternativePredictions: BreedPrediction[];
  } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setResults(null);
    setError(null);
  };

  const handleReset = () => {
    setFile(null);
    setFileUrl(null);
    setResults(null);
    setError(null);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
  };

  const analyzeImage = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Create FormData and append the image
      const formData = new FormData();
      formData.append('image', file);
      
      // Call our API route
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image. Please try again.');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Upload a Dog Photo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our AI can identify over 120 different dog breeds with high accuracy.
        </p>
      </motion.div>

      <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-8 mb-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select an Image</h2>
          <FileUpload
            onFileSelect={handleFileSelect}
            accept="image/*"
            maxSizeMB={5}
          />
        </div>
        
        {file && (
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              isLoading={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Identify Breed'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={isAnalyzing}
            >
              Reset
            </Button>
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md mb-6">
            {error}
          </div>
        )}
        
        {isAnalyzing && (
          <div className="text-center p-12 border border-border rounded-lg bg-muted/20">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Analyzing your dog image...</p>
          </div>
        )}
        
        {results && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <BreedResult
              topPrediction={results.topPrediction}
              alternativePredictions={results.alternativePredictions}
            />
          </motion.div>
        )}
      </div>
      
      <div className="bg-muted/30 border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-3">How it works</h3>
        <p className="text-muted-foreground mb-4">
          Our dog breed identification system uses a machine learning model trained on thousands of dog images.
          The model analyzes visual features like coat pattern, ear shape, muzzle length, and body proportions
          to determine the most likely breed.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>For best results:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Use a clear, well-lit photo</li>
            <li>Ensure the dog is the main subject in the frame</li>
            <li>Images showing the full body typically yield better results</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 