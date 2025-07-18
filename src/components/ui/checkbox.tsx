import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
        <div
          className={cn(
            'peer relative h-5 w-5 shrink-0 rounded-sm border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800',
            'flex items-center justify-center transition-all',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <input
            type="checkbox"
            className="peer absolute inset-0 z-10 opacity-0 cursor-pointer"
            ref={ref}
            {...props}
          />
          <Check className="h-4 w-4 text-white pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-200 bg-green-600 rounded-sm" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
