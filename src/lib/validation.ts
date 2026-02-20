export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.trim().length < 3) {
    return { isValid: false, error: 'Name must be at least 3 characters' };
  }
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Work email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for personal email domains
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (personalDomains.includes(domain)) {
    return { isValid: false, error: 'Please use your work email address (company domain)' };
  }
  
  return { isValid: true };
};

export const validateNewsletterEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: 'Phone number is required' };
  }
  // Phone validation: should have country code and proper number format
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number with country code (e.g., +1234567890)' };
  }
  return { isValid: true };
};

export const validateCompany = (company: string): ValidationResult => {
  if (!company.trim()) {
    return { isValid: false, error: 'Company name is required' };
  }
  if (company.trim().length < 3) {
    return { isValid: false, error: 'Company name must be at least 3 characters' };
  }
  return { isValid: true };
};

export const validateCCOE = (ccoe: string[]): ValidationResult => {
  if (ccoe.length === 0) {
    return { isValid: false, error: 'Please select one option for CCOE' };
  }
  if (ccoe.length > 1) {
    return { isValid: false, error: 'Please select only one option for CCOE' };
  }
  return { isValid: true };
};

export const validateMessage = (message: string): ValidationResult => {
  if (!message.trim()) {
    return { isValid: false, error: 'Message is required' };
  }
  if (message.trim().length < 3) {
    return { isValid: false, error: 'Message must be at least 3 characters' };
  }
  return { isValid: true };
};
