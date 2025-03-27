
import React, { useState, useRef } from 'react';
import { Upload, X, FileImage, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5, // Default 5MB
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Reset states
    setIsSuccess(false);
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${maxSize}MB`);
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    
    setFileName(file.name);
    
    // Simulate upload process
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      onFileSelect(file);
      toast.success('Image uploaded successfully');
    }, 1500);
  };

  const clearFile = () => {
    setPreview(null);
    setFileName(null);
    setIsSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging 
              ? 'border-eco-green bg-eco-green/5' 
              : 'border-eco-neutral-300 hover:border-eco-green hover:bg-eco-green/5'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileInput}
          />
          
          <div className="flex flex-col items-center">
            <div className="mb-4 w-16 h-16 rounded-full bg-eco-green/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-eco-green" />
            </div>
            <h3 className="text-lg font-medium text-eco-neutral-800 dark:text-white mb-2">
              Drag and drop your image here
            </h3>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-400 mb-4">
              or click to browse (JPEG, PNG, GIF up to {maxSize}MB)
            </p>
            <button className="eco-button-outline mt-2">
              Select File
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-eco-neutral-200 dark:border-eco-neutral-700">
          <div className="absolute top-3 right-3 z-10 flex space-x-2">
            <button
              onClick={clearFile}
              className="p-2 bg-white dark:bg-eco-neutral-800 rounded-full shadow-md text-eco-neutral-600 hover:text-eco-red transition-colors"
              aria-label="Remove image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-eco-neutral-900/80 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-eco-green border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 font-medium text-eco-neutral-700 dark:text-eco-neutral-300">Uploading...</p>
              </div>
            </div>
          )}
          
          {isSuccess && (
            <div className="absolute top-3 left-3 z-10">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-eco-green text-white rounded-full shadow-md">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Ready for analysis</span>
              </div>
            </div>
          )}
          
          <div className="aspect-video relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="object-cover w-full h-full" 
            />
          </div>
          
          <div className="p-4 bg-white dark:bg-eco-neutral-800 border-t border-eco-neutral-200 dark:border-eco-neutral-700">
            <div className="flex items-center">
              <FileImage className="h-5 w-5 text-eco-neutral-500 mr-2" />
              <span className="text-sm text-eco-neutral-700 dark:text-eco-neutral-300 truncate">
                {fileName}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
