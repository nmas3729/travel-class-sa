import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const WHATSAPP_NUMBER = '27633690057'
export const WHATSAPP_MESSAGE = `Hi Travel Class SA 👋\n\nI’d like to plan a trip and would appreciate assistance from a travel consultant.\n\nMy destination is:\n\nTravel dates:\n\nNumber of travellers:\n\nTravel requirements:\n\nPlease let me know how you can assist. ✈️🌍`

export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
