import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  showStrength?: boolean;
}

const getPasswordStrength = (password: string): string => {
  if (password.length < 6) return 'Very Weak';
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return 'Strong';
  if (password.match(/[A-Z]/) || password.match(/[0-9]/)) return 'Moderate';
  return 'Weak';
};

const strengthColor = {
  'Very Weak': 'text-red-500',
  'Weak': 'text-orange-500',
  'Moderate': 'text-yellow-500',
  'Strong': 'text-green-600',
};

const PasswordInput = ({
  label = 'Password',
  name,
  value,
  onChange,
  required = false,
  placeholder = 'Enter password',
  showStrength = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const strength = getPasswordStrength(value);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full mt-1 px-4 py-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>Password Strength:</span>
          <span className={`font-semibold ${strengthColor[strength as keyof typeof strengthColor]}`}>
            {strength}
          </span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
