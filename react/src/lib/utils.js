import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const baseURL = import.meta.env.VITE_BACKEND_API_URL.replace(
  /\/?api\/v1\/?/,
  ''
);

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function appendBackendBaseUrl(url) {
  return `${baseURL}${url}`;
}

export function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatTime(time) {
  const d = new Date(time);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}
