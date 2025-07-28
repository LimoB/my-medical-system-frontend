// src/features/user/components/AppointmentStatusBadge.tsx
import { CheckCircle, Clock, XCircle, AlertTriangle, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { JSX } from 'react';

type Props = {
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Failed' | 'Completed';
};

const statusConfig: Record<Props['status'], { color: string; text: string; icon: JSX.Element }> = {
  Pending: {
    color: 'bg-yellow-100 text-yellow-800',
    text: 'Pending',
    icon: <Clock size={14} className="mr-1.5" />,
  },
  Confirmed: {
    color: 'bg-green-100 text-green-800',
    text: 'Confirmed',
    icon: <CheckCircle size={14} className="mr-1.5" />,
  },
  Cancelled: {
    color: 'bg-red-100 text-red-800',
    text: 'Cancelled',
    icon: <XCircle size={14} className="mr-1.5" />,
  },
  Failed: {
    color: 'bg-gray-100 text-gray-800',
    text: 'Failed',
    icon: <AlertTriangle size={14} className="mr-1.5" />,
  },
  Completed: {
    color: 'bg-blue-100 text-blue-800',
    text: 'Completed',
    icon: <CalendarCheck size={14} className="mr-1.5" />,
  },
};

const AppointmentStatusBadge = ({ status }: Props) => {
  const { color, text, icon } = statusConfig[status];

  return (
    <motion.span
      className={`inline-flex items-center text-xs px-3 py-1 rounded-full font-medium ${color} shadow-sm hover:shadow-md transition-all`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      {text}
    </motion.span>
  );
};

export default AppointmentStatusBadge;
