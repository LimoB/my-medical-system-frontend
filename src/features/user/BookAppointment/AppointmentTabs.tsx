interface AppointmentTabsProps {
  view: 'book' | 'upcoming' | 'history';
  setView: React.Dispatch<React.SetStateAction<'book' | 'upcoming' | 'history'>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const tabs = [
  { key: 'book', label: 'Make Appointment' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'history', label: 'History' },
] as const;

const AppointmentTabs = ({ view, setView, setPage }: AppointmentTabsProps) => (
  <div className="flex justify-center gap-6">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => {
          setView(tab.key);
          setPage(1);
        }}
        className={`relative pb-3 px-4 font-semibold text-sm uppercase tracking-wide transition-all duration-200
          ${view === tab.key
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500'
            : 'text-gray-500 hover:text-teal-600'
          }`}
      >
        {tab.label}
        {view === tab.key && (
          <span className="absolute left-0 bottom-0 w-full h-[3px] rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300" />
        )}
      </button>
    ))}
  </div>
);

export default AppointmentTabs;
