// src/features/user/components/AppointmentStatusBadge.tsx

type Props = {
  status: 'Pending' | 'Confirmed' | 'Cancelled';
};

const statusStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const AppointmentStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
        statusStyles[status] || 'bg-gray-200 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
};

export default AppointmentStatusBadge;
