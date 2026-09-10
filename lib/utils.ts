import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const WHATSAPP_NUMBER = '27633690057'

export function buildWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
