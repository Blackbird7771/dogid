'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">About Dog Identifier</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the story behind our dog breed identification project
        </p>
      </div>

      <div className="space-y-12">
        <div 
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Dog Identifier was created with a simple goal: to help dog lovers, shelter workers, 
              veterinarians, and curious individuals easily identify dog breeds from photos.
            </p>
            <p className="text-muted-foreground">
              Whether you're trying to identify a rescue dog's breed, curious about a dog you saw 
              at the park, or just want to learn more about different breeds, our tool provides 
              quick and accurate results.
            </p>
          </div>
          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <div className="aspect-video relative overflow-hidden rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              {/* Replace with actual image in production */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <p className="text-muted-foreground text-sm">[Mission Image Placeholder]</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Upload a Photo</h3>
              <p className="text-muted-foreground">
                Upload a clear image of a dog. The clearer the photo, the more accurate the results will be.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our trained machine learning model analyzes the image, identifying key characteristics of the dog.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive the top prediction along with alternative matches and confidence scores.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Technology Behind the Tool</h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground mb-4">
              Our dog breed identification tool uses a deep convolutional neural network trained on thousands of 
              dog images across more than 120 different breeds. The model has been fine-tuned to recognize distinctive 
              features that differentiate breeds, such as:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1 text-muted-foreground">
              <li>Coat patterns and colors</li>
              <li>Ear shape and placement</li>
              <li>Muzzle length and shape</li>
              <li>Body proportions</li>
              <li>Tail characteristics</li>
            </ul>
            <p className="text-muted-foreground">
              The system continues to improve through regular model updates and training on new data.
            </p>
          </div>
        </div>

        <div 
          className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Ready to Try It?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Upload a dog photo now and see our AI in action. It only takes a few seconds to identify the breed!
          </p>
          <Link href="/upload" passHref>
            <Button>Try Dog Identifier Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 