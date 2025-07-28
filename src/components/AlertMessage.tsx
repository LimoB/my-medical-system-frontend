// src/components/AlertMessage.tsx
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useState } from 'react';

type AlertMessageProps = {
  message: string;
  variant?: 'error' | 'info' | 'success';
  dismissible?: boolean;
};

const variantClasses = {
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  success: 'bg-green-50 text-green-700 border-green-200',
};

const variantIcons = {
  error: <AlertTriangle className="w-5 h-5 shrink-0" />,
  info: <Info className="w-5 h-5 shrink-0" />,
  success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
};

export default function AlertMessage({
  message,
  variant = 'error',
  dismissible = false,
}: AlertMessageProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-md border shadow-sm transition-all duration-300 animate-fade-in-up ${
        variantClasses[variant]
      }`}
      role="alert"
      aria-live="polite"
    >
      {variantIcons[variant]}

      <span className="flex-1 text-sm font-medium">{message}</span>

      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="text-inherit hover:opacity-70 transition"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
