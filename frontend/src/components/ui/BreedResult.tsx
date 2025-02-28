'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export interface BreedPrediction {
  breed: string;
  confidence: number;
}

interface BreedResultProps {
  topPrediction: BreedPrediction;
  alternativePredictions: BreedPrediction[];
  isLoading?: boolean;
}

// Define a local formatConfidence function
function formatConfidence(confidence: number) {
  return (confidence * 100).toFixed(1) + '%';
}

export default function BreedResult({
  topPrediction,
  alternativePredictions,
  isLoading = false,
}: BreedResultProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto bg-background border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-10 bg-muted rounded w-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-background border border-border rounded-lg p-6 shadow-sm"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Breed Results</h2>
        <p className="text-muted-foreground">Based on the uploaded image</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">Top Match</h3>
          <span className="text-sm font-medium text-primary">
            {formatConfidence(topPrediction.confidence)}
          </span>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
          <h4 className="text-xl font-bold text-foreground">{topPrediction.breed}</h4>
          <div className="mt-3 flex justify-between items-center">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${topPrediction.confidence * 100}%` }}
              ></div>
            </div>
            <Link
              href={`https://www.google.com/search?q=${encodeURIComponent(topPrediction.breed + ' dog breed')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-sm text-primary hover:text-primary-dark flex items-center"
            >
              Learn More
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {alternativePredictions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Alternative Matches</h3>
          <ul className="space-y-3">
            {alternativePredictions.map((prediction, index) => (
              <motion.li
                key={prediction.breed}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <span className="font-medium">{prediction.breed}</span>
                <span className="text-sm text-muted-foreground">
                  {formatConfidence(prediction.confidence)}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
} 