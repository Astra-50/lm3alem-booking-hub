
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to format phone numbers with LTR direction
export function formatPhoneNumber(phone: string) {
  return phone?.trim() || '';
}

// CSS class for phone number display (LTR)
export const phoneNumberClasses = "ltr text-left font-mono";
