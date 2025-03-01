'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// FAQ Accordion Item Component
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="faq-answer"
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </div>
  );
};

export default function FaqPage() {
  // FAQ data
  const faqs = [
    {
      question: "How does the dog breed identification technology work?",
      answer: "Our dog breed identification technology uses advanced artificial intelligence and deep learning algorithms trained on thousands of dog images across hundreds of breeds. The system analyzes various physical attributes of your dog including facial structure, ear shape, coat pattern, body proportions, and other distinctive features. This comprehensive analysis is compared against our extensive database to determine the most likely breed match and potential alternatives with associated confidence scores."
    },
    {
      question: "How accurate is the breed identification?",
      answer: "Our AI-powered breed identification achieves a high level of accuracy, typically above 90% for purebred dogs with clear images. For mixed breeds, the system identifies the most dominant breeds in the dog's appearance. Accuracy depends on several factors including image quality, lighting, angle, and whether the breed is well-represented in our training data. We continually improve our algorithms by expanding our dataset and refining our machine learning models to enhance accuracy over time."
    },
    {
      question: "What information is extracted from my dog's photo?",
      answer: "Our algorithm examines multiple physical characteristics from your dog's photo, such as facial features, body structure, coat type and color, tail shape, ear position, and overall proportions. The system focuses solely on identifying visual breed-specific traits and doesn't collect any personal information from the images. We use this visual data only for the purpose of breed identification and to improve our AI model's accuracy."
    },
    {
      question: "Are the photos I upload stored or shared?",
      answer: "We prioritize your privacy and data security. When you upload a photo for breed identification, it's processed in real-time, and we do not permanently store the images on our servers. Your photos are only used for the immediate analysis and are automatically deleted afterward. We don't share your photos with third parties or use them for purposes other than providing you with breed identification results."
    },
    {
      question: "Is the dog breed identification service free?",
      answer: "Yes, our basic dog breed identification service is completely free to use. We offer this as a valuable resource for dog owners and enthusiasts worldwide. For those seeking more comprehensive insights, we offer premium features that include detailed breed characteristic reports, health predisposition information, and training recommendations tailored to your dog's breed(s). These advanced features are available through our subscription plans."
    },
    {
      question: "How can I get the most accurate results?",
      answer: "For optimal results, upload a clear, well-lit photo where your dog is the main subject. Front-facing photos that show your dog's full face and body work best. Avoid using photos where your dog is wearing clothing or accessories that obscure their features, and ensure there's good lighting with minimal shadows. Taking the photo at eye level with your dog looking directly at the camera will significantly improve accuracy. If you're not satisfied with the results, try uploading a different photo that better displays your dog's characteristic features."
    },
    {
      question: "Can the tool identify mixed-breed dogs?",
      answer: "Yes, our tool can identify mixed-breed dogs, though with different outputs than for purebreds. For mixed breeds, the system will identify the most likely breed components and provide confidence percentages for each detected breed. The accuracy for mixed breeds depends on how visually prominent each breed's characteristics are in your dog. Some mixed breeds may show strong visual traits of one particular breed, while others have more subtle combinations that might be more challenging to identify with precision."
    },
    {
      question: "What dog breeds can your system identify?",
      answer: "Our system can identify over 200 dog breeds recognized by major kennel clubs worldwide, including rare and uncommon breeds. The database includes everything from popular breeds like Labrador Retrievers and German Shepherds to less common breeds such as Azawakhs and Xoloitzcuintlis. We regularly update our database to include newly recognized breeds and improve identification accuracy across all breed types."
    },
    {
      question: "Can I use the tool to identify puppies?",
      answer: "Yes, you can use our tool to identify puppies, though with some limitations. Puppies are still developing their distinctive breed characteristics, which can make identification less accurate than with adult dogs. The system will provide its best estimate based on current features, but you may want to recheck as your puppy matures. For the most reliable results with puppies, try to capture clear images that show their full face and body structure."
    },
    {
      question: "How does the system handle rare or uncommon breeds?",
      answer: "Our system is trained to recognize rare and uncommon breeds, though the accuracy may vary depending on the availability of training data for these breeds. We continuously expand our dataset to improve recognition of less common breeds. If you have a rare breed dog and receive results that don't seem accurate, you can help us improve by providing feedback. In some cases, very rare breeds might be identified as their closest genetic relatives if insufficient training data exists."
    }
  ];

  return (
    <MainLayout>
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4">Frequently Asked Questions</h1>
            <p className="section-subtitle">
              Find answers to the most common questions about our dog breed identification service
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <FaqItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12 p-8 bg-accent rounded-lg"
          >
            <h3 className="mb-4">Still have questions?</h3>
            <p className="mb-6 text-muted-foreground">
              If you couldn't find the answer to your question, feel free to contact us
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
} 