import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
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

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const sanitizeInput = (value: string): string => {
  return value.trim().replace(/<[^>]*>/g, '');
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
    
    const validationErrors: ValidationErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      validationErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message || formData.message.length < 10) {
      validationErrors.message = 'Message must be at least 10 characters';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, errors]);

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
