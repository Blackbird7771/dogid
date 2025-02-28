'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '@/components/ui/FileUpload';
import Button from '@/components/ui/Button';
import BreedResult, { BreedPrediction } from '@/components/ui/BreedResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Dog Breed Identifier
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload a photo of a dog and our AI will identify its breed. Get accurate results in seconds!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="bg-card border border-border p-6 rounded-lg shadow-sm flex-grow">
            <h2 className="text-2xl font-semibold mb-4">Upload a Dog Photo</h2>
            <FileUpload
              onFileSelect={handleFileSelect}
              accept="image/*"
              maxSizeMB={5}
            />
            
            {file && (
              <div className="mt-6 flex justify-center space-x-3">
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
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                {error}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col h-full"
        >
          {isAnalyzing ? (
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm flex-grow flex items-center justify-center">
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
          ) : (
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm flex-grow flex items-center justify-center">
              <div className="text-center p-6">
                <ArrowPathIcon className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">Results will appear here</h3>
                <p className="text-muted-foreground">
                  Upload a dog photo and click "Identify Breed" to see the results
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
