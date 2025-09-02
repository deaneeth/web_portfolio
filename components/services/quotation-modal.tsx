'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Clock,
  Shield,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  startingPrice: string;
  timeline: string;
}

interface QuotationModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = {
  'AI/ML Solutions': [
    'Custom model development',
    'Data analysis & insights',
    'Computer vision systems',
    'Natural language processing',
    'Predictive analytics',
    'Model deployment & optimization'
  ],
  'Intelligent Automation': [
    'Process automation',
    'Data pipeline creation',
    'API integrations',
    'Workflow optimization',
    'Performance monitoring',
    'Custom bot development'
  ],
  'Web Applications': [
    'Full-stack development',
    'Responsive design',
    'Database integration',
    'API development',
    'Performance optimization',
    'Progressive Web App (PWA)'
  ],
  'Design & Consulting': [
    'UI/UX design',
    'Technical architecture',
    'Code reviews',
    'Performance audits',
    'Strategic planning',
    'Design system creation'
  ]
};

const timelineOptions = [
  { value: 'asap', label: 'ASAP (Rush job)', multiplier: 1.5 },
  { value: '1-2-weeks', label: '1-2 weeks', multiplier: 1.2 },
  { value: '3-4-weeks', label: '3-4 weeks', multiplier: 1.0 },
  { value: '1-2-months', label: '1-2 months', multiplier: 0.9 },
  { value: '3-months-plus', label: '3+ months', multiplier: 0.8 },
  { value: 'flexible', label: 'Flexible timeline', multiplier: 0.8 }
];

const budgetRanges = [
  'Under $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
  'Let\'s discuss'
];

const contactMethods = [
  'Email',
  'WhatsApp',
  'LinkedIn',
  'Phone call',
  'Video call'
];

export function QuotationModal({ service, isOpen, onClose }: QuotationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const [formData, setFormData] = useState({
    selectedOptions: [] as string[],
    timeline: '',
    budget: '',
    addOns: [] as string[],
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    preferredContact: '',
    projectBrief: '',
    consent: false,
    honeypot: '' // Anti-spam field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate estimated price based on selections
  useEffect(() => {
    if (!service) return;

    const basePrice = parseInt(service.startingPrice.replace(/[^0-9]/g, ''));
    const optionMultiplier = 1 + (formData.selectedOptions.length * 0.2);
    const timelineMultiplier = timelineOptions.find(t => t.value === formData.timeline)?.multiplier || 1;
    const addOnMultiplier = 1 + (formData.addOns.length * 0.15);

    const estimated = basePrice * optionMultiplier * timelineMultiplier * addOnMultiplier;
    setEstimatedPrice(`$${Math.round(estimated).toLocaleString()}`);
  }, [formData.selectedOptions, formData.timeline, formData.addOns, service]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleOptionToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(option)
        ? prev.selectedOptions.filter(o => o !== option)
        : [...prev.selectedOptions, option]
    }));
  };

  const handleAddOnToggle = (addOn: string) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter(a => a !== addOn)
        : [...prev.addOns, addOn]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.selectedOptions.length === 0) {
        newErrors.selectedOptions = 'Please select at least one option';
      }
    } else if (step === 2) {
      if (!formData.timeline) newErrors.timeline = 'Timeline is required';
      if (!formData.budget) newErrors.budget = 'Budget range is required';
    } else if (step === 3) {
      if (!formData.clientName.trim()) newErrors.clientName = 'Name is required';
      if (!formData.clientEmail.trim()) newErrors.clientEmail = 'Email is required';
      if (formData.clientEmail && !/\S+@\S+\.\S+/.test(formData.clientEmail)) {
        newErrors.clientEmail = 'Valid email is required';
      }
      if (!formData.preferredContact) newErrors.preferredContact = 'Preferred contact method is required';
      if (!formData.projectBrief.trim()) newErrors.projectBrief = 'Project brief is required';
      if (formData.projectBrief.length < 20) newErrors.projectBrief = 'Project brief must be at least 20 characters';
      if (!formData.consent) newErrors.consent = 'Consent is required to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3) || !service) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: service.title,
          selectedOptions: formData.selectedOptions,
          timeline: formData.timeline,
          budget: formData.budget,
          projectBrief: formData.projectBrief,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          clientCompany: formData.clientCompany,
          preferredContact: formData.preferredContact,
          consent: formData.consent,
          honeypot: formData.honeypot
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast.success('Quotation request sent successfully!');
      } else {
        throw new Error(result.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      selectedOptions: [],
      timeline: '',
      budget: '',
      addOns: [],
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientCompany: '',
      preferredContact: '',
      projectBrief: '',
      consent: false,
      honeypot: ''
    });
    setCurrentStep(1);
    setErrors({});
    setEstimatedPrice('');
  };

  const handleClose = () => {
    clearForm();
    setIsSubmitted(false);
    onClose();
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!service) return null;

  const availableOptions = serviceOptions[service.title as keyof typeof serviceOptions] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isSubmitted ? (
              // Success State
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">Request Sent Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for your interest in {service.title}. You'll receive a confirmation email shortly, 
                  and I'll get back to you with a detailed proposal within 24-48 hours.
                </p>
                <Button onClick={handleClose} className="btn-primary">
                  Close
                </Button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 id="modal-title" className="text-xl font-bold">
                        Request Quote: {service.title}
                      </h2>
                      <p id="modal-description" className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClose}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mt-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= currentStep 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-16 h-1 mx-2 ${
                            step < currentStep ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Options</span>
                    <span>Details</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {/* Anti-spam honeypot field */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => handleInputChange('honeypot', e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Step 1: Project Options */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          What do you need?
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Select all options that apply to your project:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {availableOptions.map((option) => (
                            <motion.label
                              key={option}
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                                formData.selectedOptions.includes(option)
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.selectedOptions.includes(option)}
                                onChange={() => handleOptionToggle(option)}
                                className="sr-only"
                              />
                              <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                                formData.selectedOptions.includes(option)
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {formData.selectedOptions.includes(option) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm">{option}</span>
                            </motion.label>
                          ))}
                        </div>
                        
                        {errors.selectedOptions && (
                          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.selectedOptions}
                          </p>
                        )}
                      </div>

                      {/* Add-ons */}
                      <div>
                        <h4 className="font-medium mb-3">Optional Add-ons</h4>
                        <div className="space-y-2">
                          {['NDA Agreement', 'Priority Support', '3-Month Maintenance', 'Training Session'].map((addOn) => (
                            <motion.label
                              key={addOn}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                formData.addOns.includes(addOn)
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              whileHover={{ scale: 1.01 }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.addOns.includes(addOn)}
                                onChange={() => handleAddOnToggle(addOn)}
                                className="sr-only"
                              />
                              <div className={`w-4 h-4 border-2 rounded mr-3 flex items-center justify-center ${
                                formData.addOns.includes(addOn)
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              }`}>
                                {formData.addOns.includes(addOn) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm">{addOn}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Scope & Timeline */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Timeline & Budget
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="form-label">Preferred Timeline *</label>
                            <select
                              value={formData.timeline}
                              onChange={(e) => handleInputChange('timeline', e.target.value)}
                              className={`form-input ${errors.timeline ? 'border-red-500' : ''}`}
                            >
                              <option value="">Select timeline</option>
                              {timelineOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errors.timeline && (
                              <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label">Budget Range *</label>
                            <select
                              value={formData.budget}
                              onChange={(e) => handleInputChange('budget', e.target.value)}
                              className={`form-input ${errors.budget ? 'border-red-500' : ''}`}
                            >
                              <option value="">Select budget range</option>
                              {budgetRanges.map((range) => (
                                <option key={range} value={range}>
                                  {range}
                                </option>
                              ))}
                            </select>
                            {errors.budget && (
                              <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Estimated Price */}
                      {estimatedPrice && formData.selectedOptions.length > 0 && formData.timeline && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <span className="font-medium">Estimated Price Range</span>
                          </div>
                          <p className="text-2xl font-bold text-primary">{estimatedPrice} - {estimatedPrice.replace(/\d+/, (match) => (parseInt(match) * 1.5).toString())}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            *Final price may vary based on specific requirements
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Contact Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Full Name *</label>
                            <Input
                              type="text"
                              value={formData.clientName}
                              onChange={(e) => handleInputChange('clientName', e.target.value)}
                              className={errors.clientName ? 'border-red-500' : ''}
                              placeholder="Your full name"
                            />
                            {errors.clientName && (
                              <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label">Email Address *</label>
                            <Input
                              type="email"
                              value={formData.clientEmail}
                              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                              className={errors.clientEmail ? 'border-red-500' : ''}
                              placeholder="your@email.com"
                            />
                            {errors.clientEmail && (
                              <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
                            )}
                          </div>

                          <div>
                            <label className="form-label">Phone Number</label>
                            <Input
                              type="tel"
                              value={formData.clientPhone}
                              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div>
                            <label className="form-label">Company</label>
                            <Input
                              type="text"
                              value={formData.clientCompany}
                              onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                              placeholder="Your company name"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="form-label">Preferred Contact Method *</label>
                          <select
                            value={formData.preferredContact}
                            onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                            className={`form-input ${errors.preferredContact ? 'border-red-500' : ''}`}
                          >
                            <option value="">Select contact method</option>
                            {contactMethods.map((method) => (
                              <option key={method} value={method}>
                                {method}
                              </option>
                            ))}
                          </select>
                          {errors.preferredContact && (
                            <p className="text-red-500 text-sm mt-1">{errors.preferredContact}</p>
                          )}
                        </div>

                        <div className="mt-4">
                          <label className="form-label">Project Brief *</label>
                          <textarea
                            value={formData.projectBrief}
                            onChange={(e) => handleInputChange('projectBrief', e.target.value)}
                            className={`form-input form-textarea ${errors.projectBrief ? 'border-red-500' : ''}`}
                            placeholder="Describe your project, goals, and any specific requirements... (minimum 20 characters)"
                            rows={4}
                          />
                          <div className="flex justify-between items-center mt-1">
                            {errors.projectBrief ? (
                              <p className="text-red-500 text-sm">{errors.projectBrief}</p>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                {formData.projectBrief.length}/20 characters minimum
                              </span>
                            )}
                          </div>
                        </div>

                        {/* GDPR Consent */}
                        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                          <motion.label
                            className="flex items-start gap-3 cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.consent}
                              onChange={(e) => handleInputChange('consent', e.target.checked)}
                              className="mt-1"
                            />
                            <div className="text-sm">
                              <span className="font-medium">I consent to data processing *</span>
                              <p className="text-muted-foreground mt-1">
                                I agree to the processing of my personal data for the purpose of this quotation request. 
                                Your data will be used solely to respond to your inquiry and will not be shared with third parties.
                              </p>
                            </div>
                          </motion.label>
                          {errors.consent && (
                            <p className="text-red-500 text-sm mt-2">{errors.consent}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {currentStep > 1 && (
                        <Button variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                      )}
                      <Button variant="ghost" onClick={clearForm}>
                        Clear
                      </Button>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleClose}>
                        Cancel
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button onClick={nextStep} className="btn-primary">
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="btn-primary"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Request
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Estimated Price Display */}
                  {estimatedPrice && currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-center"
                    >
                      <span className="text-sm text-muted-foreground">Estimated Price: </span>
                      <span className="font-bold text-primary">{estimatedPrice}+</span>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}