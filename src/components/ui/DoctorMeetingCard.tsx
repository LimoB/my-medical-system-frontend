// src/components/DoctorMeetingCard.tsx
import { CalendarDays, Clock, Globe } from 'lucide-react';
import { format } from 'date-fns';
import type { Meeting } from '@/types/meeting';

type Props = {
  meeting: Meeting;
};

const DoctorMeetingCard = ({ meeting }: Props) => {
  const { title, description, meeting_date, meeting_time, is_global } = meeting;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition">
      {/* Title + Global Badge */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        {is_global && (
          <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full flex items-center gap-1">
            <Globe className="w-4 h-4" /> Global
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{description}</p>
      )}

      {/* Date and Time */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          <span>{format(new Date(meeting_date), 'dd MMM yyyy')}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{meeting_time.slice(0, 5)}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorMeetingCard;
