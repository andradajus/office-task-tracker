import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseURL = import.meta.env.VITE_BACKEND_API_URL.replace(/\/?api\/v1\/?/, '');

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function appendBackendBaseUrl(url) {
  return `${baseURL}${url}`;
}