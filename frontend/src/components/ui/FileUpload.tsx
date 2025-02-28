'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpTrayIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export default function FileUpload({
  onFileSelect,
  accept = 'image/jpeg, image/png, image/jpg',
  maxSizeMB = 5,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match(/(jpeg|jpg|png)/g)) {
      setError('Please upload a valid image (JPEG, JPG, or PNG)');
      return false;
    }

    // Check file size (convert MB to bytes)
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    if (!validateFile(file)) {
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass file to parent component
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        aria-label="Upload file"
      />

      {!preview ? (
        <motion.div
          className={`relative flex flex-col items-center justify-center w-full min-h-[250px] border-2 border-dashed rounded-lg p-8 transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted hover:bg-muted/70'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              {isDragging ? (
                <ArrowUpTrayIcon className="w-6 h-6 text-primary" />
              ) : (
                <PhotoIcon className="w-6 h-6 text-primary" />
              )}
            </div>
            <h3 className="font-medium text-foreground">
              {isDragging ? 'Drop your image here' : 'Upload your dog photo'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, JPEG, or PNG (max. {maxSizeMB}MB)
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="relative rounded-lg overflow-hidden min-h-[250px] border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={preview}
            alt="Preview"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 rounded-full bg-background/80 border border-border hover:bg-muted"
            aria-label="Remove image"
          >
            <XMarkIcon className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>
      )}

      {error && (
        <motion.p
          className="mt-2 text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
} 