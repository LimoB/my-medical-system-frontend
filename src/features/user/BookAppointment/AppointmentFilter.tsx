interface AppointmentFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AppointmentFilter = ({ filter, setFilter }: AppointmentFilterProps) => (
  <div className="mb-6 max-w-md mx-auto">
    <input
      type="text"
      placeholder="🔍 Filter by specialization..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm text-sm placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
    />
  </div>
);

export default AppointmentFilter;
