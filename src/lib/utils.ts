import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'ريال'): string {
  return `${amount.toLocaleString('ar-SA')} ${currency}`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString('ar-SA');
}
