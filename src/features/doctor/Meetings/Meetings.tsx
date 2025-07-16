import { useEffect, useState } from 'react';
import { getMeetings } from '@/services/meeting';
import type { Meeting } from '@/types/meeting';
import { CalendarDays, Loader2 } from 'lucide-react';
import DoctorMeetingCard from '@/components/ui/DoctorMeetingCard';

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (err: any) {
        setError('Failed to fetch meetings');
        console.error('❌ Meetings Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="space-y-6">
      {/* 🟢 Title */}
      <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-emerald-600" />
        Doctor Meetings
      </h1>

      {/* 🔄 Loading */}
      {loading && (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin w-6 h-6 text-emerald-500" />
        </div>
      )}

      {/* ❌ Error */}
      {error && (
        <div className="text-red-500 font-medium text-sm">{error}</div>
      )}

      {/* 🗓️ No Meetings */}
      {!loading && !error && meetings.length === 0 && (
        <p className="text-gray-600 text-sm">No meetings scheduled.</p>
      )}

      {/* ✅ Meetings List */}
      {!loading && !error && meetings.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.map((meeting) => (
            <DoctorMeetingCard key={meeting.meeting_id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;
