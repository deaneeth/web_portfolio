'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Calendar, DollarSign, Loader2, CheckCircle2 } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  startingPrice: string;
}

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

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePaymentMethodClick = (methodId: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Project requirements are required';
    } else if (formData.requirements.trim().length < 20) {
      newErrors.requirements = 'Please provide at least 20 characters describing your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} exceeds 10MB limit`;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return `${file.name} has an unsupported file type`;
    }
    return null;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    let hasError = false;

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      setFiles((prev) => [...prev, ...fileArray]);
      setFileError('');
    }
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
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError('');
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

      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds
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

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
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
                <div className="relative p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                    aria-label="Close modal"
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
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
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Requirements */}
                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                      Project Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Describe your project requirements, goals, and any specific details..."
                      rows={5}
                      className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                        errors.requirements ? 'border-red-500' : 'border-border'
                      }`}
                      disabled={isSubmitting}
                    />
                    {errors.requirements && (
                      <p className="text-xs text-red-500 mt-1">{errors.requirements}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.requirements.length} characters (minimum 20)
                    </p>
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
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium mb-1">
                        {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, PPT, Images, ZIP (Max 10MB)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.zip"
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
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              className="p-1 hover:bg-background rounded transition-colors"
                              disabled={isSubmitting}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {fileError && (
                      <p className="text-xs text-red-500 mt-2">{fileError}</p>
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
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="e.g., $2,000 - $5,000"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Payment Methods (Coming Soon)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => handlePaymentMethodClick(method.id)}
                          disabled={isSubmitting}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            formData.paymentMethod === method.id
                              ? `bg-gradient-to-r ${method.color} text-white shadow-lg scale-105`
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Submit Order
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
