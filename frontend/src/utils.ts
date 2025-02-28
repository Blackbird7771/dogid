import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and then merges Tailwind classes with tailwind-merge
 * This prevents duplicate or conflicting Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a file size with the appropriate unit (KB, MB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

/**
 * Formats a number as a percentage string
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Check if a URL is absolute (includes http:// or https://)
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
} 