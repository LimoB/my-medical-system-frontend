interface AppointmentPaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppointmentPagination = ({ totalPages, page, setPage }: AppointmentPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = page === pageNumber;

        return (
          <button
            key={i}
            onClick={() => setPage(pageNumber)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200
              ${isActive
                ? 'text-white bg-gradient-to-r from-teal-600 to-emerald-500 shadow-md'
                : 'text-gray-600 bg-gray-100 hover:bg-teal-100'
              }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default AppointmentPagination;
