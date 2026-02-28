import { useState, useCallback } from 'react';
import { validateForm, sanitizeInput, isSpam, contactFormRules, ValidationErrors } from '../utils/validation';
import { errorTracker } from '../services/errorTracker';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormReturn {
  formData: FormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: ''
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    const sanitized = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    errorTracker.addBreadcrumb('Contact form submission started', 'form');
    
    const formDataObj: Record<string, string> = {
      name: formData.name,
      email: formData.email,
      message: formData.message
    };
    
    const validationErrors = validateForm(formDataObj, contactFormRules);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      errorTracker.captureMessage('Form validation failed', 'warning');
      return;
    }

    if (isSpam(formData.message)) {
      setErrors({ message: 'Your message appears to be spam. Please try again.' });
      errorTracker.captureMessage('Spam detected in contact form', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Array.from(formDataToSend.entries()) as [string, string][]).toString()
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      errorTracker.addBreadcrumb('Contact form submitted successfully', 'form');
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      errorTracker.captureError(error as Error, {
        tags: { form: 'contact' },
        extra: { formData: { ...formData, message: '[REDACTED]' } }
      });
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSuccess(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm
  };
};
