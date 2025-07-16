interface AppointmentPaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppointmentPagination = ({ totalPages, page, setPage }: AppointmentPaginationProps) => (
  <div className="mt-4 flex justify-center gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`w-8 h-8 rounded-full text-sm font-medium ${page === i + 1
            ? 'bg-teal-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
          }`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default AppointmentPagination;
