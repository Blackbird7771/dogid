'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FileUpload from '@/components/ui/FileUpload';
import Button from '@/components/ui/Button';
import BreedResult from '@/components/ui/BreedResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import MainLayout from '@/components/layout/MainLayout';

// Animation variants
const fadeIn: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

  // Testimonial data
  const testimonials = [
    {
      content: "I've been wondering about my rescue dog's breed for years. This tool identified him as a Border Collie mix with 92% confidence, which explains his herding behavior!",
      author: "Sarah Johnson",
      title: "Dog Owner",
      image: "/images/testimonial1.jpg"
    },
    {
      content: "As a veterinarian, I'm impressed with the accuracy of this tool. It correctly identified several breeds that would be difficult even for professionals to pinpoint.",
      author: "Dr. Michael Chen",
      title: "Veterinarian",
      image: "/images/testimonial2.jpg"
    },
    {
      content: "We used this at our shelter to help provide better information to potential adopters about our rescue dogs. It's been incredibly helpful!",
      author: "Emma Rodriguez",
      title: "Animal Shelter Manager",
      image: "/images/testimonial3.jpg"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content" 
            initial="initial" 
            animate="animate" 
            variants={staggerChildren}
          >
            <motion.h1 
              className="hero-title" 
              variants={fadeIn}
            >
              Find Out Your Dog's Breed Instantly
            </motion.h1>
            <motion.p 
              className="hero-subtitle" 
              variants={fadeIn}
            >
              Our AI-powered tool identifies your dog's breed with astonishing accuracy. 
              Simply upload a photo and get results in seconds.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="/upload" passHref>
                <Button variant="primary" size="lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload a Dog Photo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="hidden md:block">
          <Image 
            src="/images/hero-dog.jpg" 
            alt="Happy dog" 
            className="hero-image"
            width={800}
            height={600}
            priority
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-muted">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            <h2>How It Works</h2>
            <p className="section-subtitle">
              Our advanced AI technology makes identifying your dog's breed quick and easy.
            </p>
          </motion.div>

          <div className="grid-3">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-primary text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Upload a Photo</h3>
              <p className="text-muted-foreground">
                Take a clear photo of your dog or select one from your gallery. For best results, 
                ensure good lighting and a clear view of your dog's face and body.
              </p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-primary text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced machine learning algorithm analyzes your dog's physical features, 
                comparing them against thousands of breed samples for accurate identification.
              </p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-primary text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed results showing your dog's breed with confidence levels and 
                information about the breed's characteristics, temperament, and care needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Upload Section */}
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2>Try It Now</h2>
            <p className="section-subtitle">
              Instantly identify your dog's breed with our AI technology
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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
                          <div className="mr-2">
                            <LoadingSpinner size="sm" />
                          </div>
                          Analyzing...
                        </>
                      ) : 'Identify Breed'}
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
            </motion.div>

            {/* Results Section */}
            {results && (
              <motion.div 
                className="card mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BreedResult
                  topPrediction={results.topPrediction}
                  alternativePredictions={results.alternativePredictions}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2>Tips for Accurate Results</h2>
            <p className="section-subtitle">
              Maximize the accuracy of the dog breed detection with these simple steps
            </p>
          </motion.div>

          <div className="tips-grid">
            <motion.div 
              className="tip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h5>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                Use Good Lighting
              </h5>
              <p>
                Ensure your dog is well-lit with even lighting to avoid shadows that might obscure features. 
                Natural daylight is best, ideally with your dog facing toward the light source.
              </p>
            </motion.div>
            
            <motion.div 
              className="tip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h5>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Frontal Pose
              </h5>
              <p>
                Capture the image with your dog's face directly facing the camera. 
                This position allows the AI to analyze key facial features for more accurate breed identification.
              </p>
            </motion.div>
            
            <motion.div 
              className="tip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h5>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Single Dog Only
              </h5>
              <p>
                Make sure only one dog is in the image to avoid confusion in the breed determination process. 
                Multiple dogs in the photo can lead to inaccurate results.
              </p>
            </motion.div>
            
            <motion.div 
              className="tip-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h5>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Avoid Obstructions
              </h5>
              <p>
                Ensure that nothing is covering your dog's key features. 
                Accessories like collars and bandanas should be minimal so they don't obscure identifying traits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2>What Dog Owners Say</h2>
            <p className="section-subtitle">
              Thousands of dog owners have discovered their dog's breed using our AI technology
            </p>
          </motion.div>

          <div className="grid-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="testimonial-content">
                  "{testimonial.content}"
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-author-image bg-muted rounded-full w-12 h-12" />
                  <div>
                    <div className="testimonial-author-name">{testimonial.author}</div>
                    <div className="testimonial-author-title">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-accent">
        <div className="container">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4">Ready to identify your dog's breed?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Upload a photo now and discover your dog's breed in seconds with our accurate AI analysis.
            </p>
            <Link href="/upload" passHref>
              <Button variant="primary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
