// src/components/AlertMessage.tsx
import { AlertTriangle } from 'lucide-react';

type AlertMessageProps = {
  message: string;
  variant?: 'error' | 'info' | 'success';
};

const variantClasses = {
  error: 'bg-red-100 text-red-700 border-red-300',
  info: 'bg-blue-100 text-blue-700 border-blue-300',
  success: 'bg-green-100 text-green-700 border-green-300',
};

export default function AlertMessage({
  message,
  variant = 'error',
}: AlertMessageProps) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded border ${variantClasses[variant]}`}
    >
      <AlertTriangle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}
