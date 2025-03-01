'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const features = [
    {
      title: "Advanced AI Technology",
      description: "Our state-of-the-art machine learning algorithms have been trained on thousands of dog images across hundreds of breeds.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Fast & Accurate",
      description: "Get precise breed identification results in seconds, with confidence scores that indicate prediction certainty.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Privacy Focused",
      description: "We don't store your images after processing. Your photos are used only for identification and immediately deleted.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Comprehensive Database",
      description: "Our system can identify over 200 dog breeds recognized by major kennel clubs worldwide.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent opacity-50 z-0"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6">About Our Technology</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Discover how our AI-powered tool is revolutionizing dog breed identification with cutting-edge technology and machine learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section">
        <div className="container">
          <div className="grid-2 items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6">Our Mission</h2>
              <p className="mb-4">
                At DogID, we're passionate about helping dog owners and enthusiasts better understand their canine companions through technology. Our mission is to create accessible, accurate tools that deepen the bond between humans and dogs.
              </p>
              <p className="mb-4">
                Many dog owners, especially those with rescue pets, wonder about their dog's breed background. Understanding breed traits can provide valuable insights into behavior, health considerations, and training approaches.
              </p>
              <p>
                We've built our AI-powered breed identification system to satisfy this curiosity and provide a valuable resource for dog lovers everywhere—bridging the gap between cutting-edge technology and our love for dogs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-lg aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-sm">Image: Happy dog with owner</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">How Our AI Technology Works</h2>
            <p className="section-subtitle">
              Our breed identification system uses advanced machine learning to analyze your dog's photos and identify their breed with remarkable accuracy
            </p>
          </motion.div>

          <div className="grid-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="rounded-full bg-accent w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-accent-foreground font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Learning</h3>
              <p className="text-muted-foreground">
                Our AI model has been trained on a diverse dataset of over 100,000 labeled dog images spanning more than 200 breeds. This extensive training allows the system to recognize patterns and features specific to each breed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="rounded-full bg-accent w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-accent-foreground font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Feature Analysis</h3>
              <p className="text-muted-foreground">
                When you upload a photo, our system identifies key physical traits in your dog—analyzing ear shape, muzzle length, coat texture, color patterns, body proportions, and many other distinctive characteristics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="rounded-full bg-accent w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-accent-foreground font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Confidence Scoring</h3>
              <p className="text-muted-foreground">
                Our algorithm compares these features against its trained dataset to identify the most likely breed matches. Each prediction comes with a confidence score, reflecting the probability of a correct breed identification.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Key Features</h2>
            <p className="section-subtitle">
              What makes our dog breed identification technology stand out from the rest
            </p>
          </motion.div>

          <div className="grid-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex items-start p-6"
              >
                <div className="mr-4 text-primary">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="section bg-accent">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Your Privacy Matters</h2>
            <div className="card text-left">
              <h3 className="text-xl font-semibold mb-4">Our Privacy Commitment</h3>
              <p className="mb-4">
                We take your privacy seriously and have designed our system with data protection in mind:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li>Your photos are processed in real-time and are <strong>not permanently stored</strong> on our servers</li>
                <li>We <strong>don't share</strong> your images with third parties</li>
                <li>Photos are used <strong>only</strong> for breed identification</li>
                <li>No personal information is extracted from your images</li>
                <li>All data transmission is secured with encryption</li>
              </ul>
              <p>
                We believe you should be able to use our technology with complete confidence that your privacy is protected. For more details, please review our full <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="mb-4">Ready to identify your dog's breed?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Try our AI-powered breed identification tool now and discover your dog's breed in seconds.
            </p>
            <Link href="/upload" className="btn btn-primary btn-lg">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 