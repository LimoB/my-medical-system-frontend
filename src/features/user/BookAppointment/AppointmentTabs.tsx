interface AppointmentTabsProps {
  view: 'book' | 'upcoming' | 'history';
  setView: React.Dispatch<React.SetStateAction<'book' | 'upcoming' | 'history'>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppointmentTabs = ({ view, setView, setPage }: AppointmentTabsProps) => (
  <div className="flex justify-center gap-6 mb-6 border-b">
    {['book', 'upcoming', 'history'].map((tab) => (
      <button
        key={tab}
        onClick={() => {
          setView(tab as any);
          setPage(1);
        }}
        className={`relative pb-2 px-4 font-medium transition-colors ${view === tab
            ? 'text-teal-600'
            : 'text-gray-500 hover:text-teal-500'
          }`}
      >
        {tab === 'book' ? 'Make Appointment' : tab === 'upcoming' ? 'Upcoming' : 'History'}
        {view === tab && (
          <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-600 rounded-full transition-all duration-300" />
        )}
      </button>
    ))}
  </div>
);

export default AppointmentTabs;
