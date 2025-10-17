'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Calendar, DollarSign, Loader2, CheckCircle2 } from 'lucide-react';
import { Service } from '@/data/types';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

interface FormData {
  name: string;
  email: string;
  requirements: string;
  deadline: string;
  budget: string;
  paymentMethod: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  requirements?: string;
  deadline?: string;
  budget?: string;
}

const PAYMENT_METHODS = [
  { id: 'paypal', label: 'PayPal', color: 'from-blue-500 to-blue-600' },
  { id: 'stripe', label: 'Stripe', color: 'from-purple-500 to-purple-600' },
  { id: 'bank', label: 'Bank Transfer', color: 'from-green-500 to-green-600' },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/zip',
  'application/x-zip-compressed',
];

export function ServiceOrderModal({ isOpen, onClose, service }: ServiceOrderModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    requirements: '',
    deadline: '',
    budget: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileError, setFileError] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSubmitting, onClose]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: methodId }));
  };

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} is too large. Maximum size is 10MB.`;
    }
    
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return `${file.name} is not a supported file type.`;
    }
    
    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFileError('');
    
    for (const file of selectedFiles) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
    }
    
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFileError('');
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    for (const file of droppedFiles) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
    }
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Please describe your requirements';
    } else if (formData.requirements.trim().length < 20) {
      newErrors.requirements = 'Please provide more details (minimum 20 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('requirements', formData.requirements);
      formDataToSend.append('deadline', formData.deadline || 'Not specified');
      formDataToSend.append('budget', formData.budget || 'Not specified');
      formDataToSend.append('paymentMethod', formData.paymentMethod || 'To be discussed');
      formDataToSend.append('service', service?.title || 'General Inquiry');
      
      files.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('/api/send-order', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setShowSuccess(true);
      
      setTimeout(() => {
        resetForm();
        setShowSuccess(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error submitting order:', error);
      setFileError('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      requirements: '',
      deadline: '',
      budget: '',
      paymentMethod: '',
    });
    setFiles([]);
    setErrors({});
    setFileError('');
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!service || !mounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />

          {/* Modal Container - Fixed positioning, no scroll here */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflow: 'hidden'
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '48rem',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl relative flex flex-col max-h-full overflow-hidden">
                  {/* Success Overlay */}
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-card/95 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-center p-8"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                          </motion.div>
                          <h3 className="text-2xl font-bold mb-3">Order Sent Successfully! ✓</h3>
                          <p className="text-muted-foreground max-w-md">
                            Your order request has been sent! I'll review it and contact you via email shortly.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Header */}
                  <div className="relative p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-2xl">
                    <button
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 z-20"
                      aria-label="Close modal"
                      type="button"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-4 pr-12">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Order {service.title}</h2>
                        <p className="text-sm text-muted-foreground">From {service.startingPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form - Scrollable Content */}
                  <div className="overflow-y-auto overflow-x-hidden" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.name ? 'border-red-500' : 'border-border'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.email ? 'border-red-500' : 'border-border'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                        Project Requirements <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Describe your project requirements, goals, and any specific details..."
                        className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                          errors.requirements ? 'border-red-500' : 'border-border'
                        }`}
                        disabled={isSubmitting}
                      />
                      <div className="flex justify-between items-center mt-1">
                        {errors.requirements ? (
                          <p className="text-red-500 text-xs">{errors.requirements}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {formData.requirements.length} characters (minimum 20)
                          </p>
                        )}
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Upload Files (Optional)
                      </label>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                          isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${
                          isDragging ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <p className="text-sm font-medium mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, PPT, Images, ZIP (Max 10MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          multiple
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.zip"
                          className="hidden"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* File List */}
                      {files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-muted rounded-lg"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-sm truncate">{file.name}</span>
                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(index);
                                }}
                                className="p-1 hover:bg-background rounded transition-colors flex-shrink-0"
                                disabled={isSubmitting}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {fileError && (
                        <p className="text-red-500 text-xs mt-2">{fileError}</p>
                      )}
                    </div>

                    {/* Deadline & Budget Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Deadline */}
                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Project Deadline
                        </label>
                        <input
                          type="date"
                          id="deadline"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Budget */}
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2">
                          <DollarSign className="w-4 h-4 inline mr-1" />
                          Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          disabled={isSubmitting}
                        >
                          <option value="">Select budget range</option>
                          <option value="$0-$500">$0 - $500</option>
                          <option value="$500-$1000">$500 - $1,000</option>
                          <option value="$1000-$2500">$1,000 - $2,500</option>
                          <option value="$2500-$5000">$2,500 - $5,000</option>
                          <option value="$5000+">$5,000+</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Preferred Payment Method
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {PAYMENT_METHODS.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handlePaymentMethodChange(method.id)}
                            disabled={isSubmitting}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              formData.paymentMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className={`w-7 h-7 mx-auto mb-2 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                              <DollarSign className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-medium">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Order'
                        )}
                      </button>
                    </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
}
