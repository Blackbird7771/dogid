'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "How accurate is the dog breed identification?",
    answer: (
      <>
        <p>Our AI model has been trained on thousands of dog images and achieves an accuracy rate of over 90% for the top prediction among the 120+ breeds it can identify.</p>
        <p className="mt-2">For mixed breed dogs, the system will identify the breeds that most closely match the dog's appearance, which can provide insight into its heritage.</p>
      </>
    )
  },
  {
    question: "What types of images work best?",
    answer: (
      <ul className="space-y-2">
        <li>• Clear, well-lit photos</li>
        <li>• Images where the dog is the main subject</li>
        <li>• Photos showing the full body of the dog</li>
        <li>• Multiple angles if available (though only one image can be processed at a time)</li>
      </ul>
    )
  },
  {
    question: "Why does the tool sometimes misidentify a breed?",
    answer: (
      <>
        <p>Several factors can affect identification accuracy:</p>
        <ul className="mt-2 space-y-1">
          <li>• Mixed breed dogs may have features from multiple breeds</li>
          <li>• Unusual colorations or grooming styles</li>
          <li>• Poor lighting or blurry images</li>
          <li>• Partial views of the dog</li>
          <li>• Rare breeds or varieties not included in our training data</li>
        </ul>
      </>
    )
  },
  {
    question: "Is there a limit to how many images I can analyze?",
    answer: "No, there is currently no limit to the number of images you can analyze. The service is free to use."
  },
  {
    question: "How do you handle my uploaded images?",
    answer: "Your privacy is important to us. Uploaded images are only used for processing the breed identification and are not permanently stored on our servers. Images are automatically deleted after processing."
  },
  {
    question: "Can this tool identify puppies?",
    answer: "Yes, but with lower accuracy than adult dogs. Puppies often lack the distinctive characteristics of their breed until they mature, making identification more challenging. For best results with puppies, try to use clear images showing distinctive features."
  },
  {
    question: "Does this work for all dog breeds?",
    answer: "Our system can identify over 120 recognized dog breeds. While this covers most common breeds, some rare or newly recognized breeds might not be included in our model. We regularly update our AI to expand its breed recognition capabilities."
  },
  {
    question: "What if my dog is a mixed breed?",
    answer: "For mixed breed dogs, the system will identify the breeds that appear most prominently in the dog's appearance. The results may provide insight into your dog's heritage, but for definitive genetic information, a DNA test would be more appropriate."
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our dog breed identification tool
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-card hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <ChevronDownIcon 
                className={`w-5 h-5 text-muted-foreground transition-transform ${openItem === index ? 'transform rotate-180' : ''}`} 
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openItem === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 bg-background text-muted-foreground">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 p-6 border border-primary/20 bg-primary/5 rounded-lg text-center"
      >
        <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
        <p className="mb-4 text-muted-foreground">
          If you couldn't find the answer you were looking for, feel free to contact us.
        </p>
        <Link href="/contact" passHref>
          <Button variant="outline">Contact Us</Button>
        </Link>
      </motion.div>
    </div>
  );
} 