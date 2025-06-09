
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to format phone numbers with proper spacing for Moroccan numbers
export function formatPhoneNumber(phone: string) {
  if (!phone) return '';
  
  const cleaned = phone.trim();
  
  // Format Moroccan phone numbers (10 digits starting with 0)
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return cleaned.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  
  // Format international numbers
  if (cleaned.startsWith('+212')) {
    const local = cleaned.substring(4);
    if (local.length === 9) {
      return `+212 ${local.substring(0, 1)} ${local.substring(1, 3)} ${local.substring(3, 5)} ${local.substring(5, 7)} ${local.substring(7)}`;
    }
  }
  
  // Return as-is if no specific format matches
  return cleaned;
}

// CSS class for phone number display (LTR)
export const phoneNumberClasses = "ltr text-left font-mono tracking-wide";
