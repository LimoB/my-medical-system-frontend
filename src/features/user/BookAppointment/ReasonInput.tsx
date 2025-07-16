interface ReasonInputProps {
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}

const ReasonInput = ({ reason, setReason }: ReasonInputProps) => (
  <div className="mb-6 max-w-md mx-auto">
    <textarea
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      placeholder="Enter the reason for the appointment"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      rows={4}
    />
  </div>
);

export default ReasonInput;
