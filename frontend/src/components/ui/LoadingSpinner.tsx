'use client';

import { motion } from "framer-motion";
// Try to import from the main location first, with a fallback to the alternate location
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

// Define a local cn function as a last resort fallback
function localCn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default function LoadingSpinner({
  size = 'md', 
  color = 'primary',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
  };

  // Use the available cn function
  const combineClasses = cn || localCn;

  return (
    <div className={combineClasses("flex items-center justify-center", className)}>
      <div
        className="animate-spin"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={combineClasses("border-2 rounded-full border-t-transparent", sizeClasses[size], colorClasses[color])}
        ></motion.div>
      </div>
    </div>
  );
} 