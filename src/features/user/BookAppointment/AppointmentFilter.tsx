interface AppointmentFilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AppointmentFilter = ({ filter, setFilter }: AppointmentFilterProps) => (
  <div className="mb-6 max-w-md mx-auto">
    <input
      type="text"
      placeholder="Filter by specialization..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

export default AppointmentFilter;
