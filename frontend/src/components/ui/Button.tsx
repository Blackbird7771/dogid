'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', href, isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark',
      outline: 'border border-input bg-background hover:bg-muted hover:text-foreground',
      ghost: 'hover:bg-muted hover:text-foreground',
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-8 py-2.5 text-base',
    };
    
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    if (isLoading) {
      return (
        <button
          ref={ref}
          className={`${buttonClasses} cursor-not-allowed`}
          disabled
          {...props}
        >
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </button>
      );
    }
    
    if (href) {
      return (
        <Link href={href} className={buttonClasses}>
          <motion.span
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center"
          >
            {children}
          </motion.span>
        </Link>
      );
    }
    
    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full h-full"
        >
          {children}
        </motion.div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 