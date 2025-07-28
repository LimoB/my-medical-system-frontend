import { useEffect } from 'react';
import { FaPenFancy } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ReasonInputProps {
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}

const ReasonInput = ({ reason, setReason }: ReasonInputProps) => {
  useEffect(() => {
    // Optional: auto-focus or scroll behavior here
  }, []);

  return (
    <motion.div
      className="mb-8 max-w-xl mx-auto p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-white shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <label className="flex items-center gap-2 text-lg font-semibold text-teal-700 mb-2">
        <FaPenFancy className="text-teal-600" />
        Reason for Appointment
      </label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Briefly describe the reason for your visit..."
        className="w-full border border-teal-300 rounded-xl px-5 py-3 text-base text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
        rows={5}
      />
    </motion.div>
  );
};

export default ReasonInput;
