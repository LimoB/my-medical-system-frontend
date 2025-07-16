import {
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
  parseISO,
  isAfter,
  compareAsc,
} from 'date-fns';
import { useMemo, useEffect, useState } from 'react';
import { getMeetings } from '@/services/meeting';
import type { Meeting } from '@/types/meeting';

interface MarkedDate {
  day: number;
  hasMeeting?: boolean;
  hasAppointment?: boolean;
}

interface CalendarPanelProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  markedDates?: MarkedDate[];
}

const CalendarPanel = ({
  selectedDate,
  onDateSelect,
  markedDates = [],
}: CalendarPanelProps) => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy');
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(startOfMonth(currentDate));

  const [, setMeetings] = useState<Meeting[]>([]);
  const [upcoming, setUpcoming] = useState<Meeting | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const allMeetings = await getMeetings();

        const futureMeetings = allMeetings
          .filter((m) =>
            isAfter(parseISO(`${m.meeting_date}T${m.meeting_time}`), currentDate)
          )
          .sort((a, b) =>
            compareAsc(
              parseISO(`${a.meeting_date}T${a.meeting_time}`),
              parseISO(`${b.meeting_date}T${b.meeting_time}`)
            )
          );

        setUpcoming(futureMeetings[0] || null);
        setMeetings(allMeetings);
      } catch (err) {
        console.error('❌ Failed to load meetings:', err);
      }
    };

    fetchMeetings();
  }, []);

  const calendarDays = useMemo(() => {
    const blanks = Array(startWeekday).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
  }, [daysInMonth, startWeekday]);

  const getDayMark = (day: number): MarkedDate | undefined =>
    markedDates.find((d) => d.day === day);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full h-full font-sans flex flex-col justify-between">
      {/* Month Heading */}
      <div className="text-center mb-4">
        <p className="text-base font-bold text-gray-900">{currentMonth}</p>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i}>{day[0]}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-3 text-center text-sm text-gray-800">
        {calendarDays.map((day, idx) =>
          day === null ? (
            <div key={`blank-${idx}`} />
          ) : (
            <div
              key={day}
              onClick={() =>
                onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
              }
              className={`relative h-8 w-8 mx-auto flex items-center justify-center rounded-full cursor-pointer transition
                hover:bg-gray-100
                ${
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentDate.getMonth()
                    ? 'ring-2 ring-emerald-500 text-emerald-700 font-bold bg-emerald-50'
                    : ''
                }`}
            >
              {day}
              {/* Colored Ring Indicator */}
              {(() => {
                const mark = getDayMark(day);
                if (!mark) return null;

                let ringClass = '';
                if (mark.hasMeeting && mark.hasAppointment) {
                  ringClass = 'bg-gradient-to-br from-blue-400 via-purple-400 to-red-400 opacity-20';
                } else if (mark.hasMeeting) {
                  ringClass = 'bg-red-500/20';
                } else if (mark.hasAppointment) {
                  ringClass = 'bg-blue-500/20';
                }

                return (
                  <div
                    className={`absolute inset-0 rounded-full ${ringClass}`}
                  />
                );
              })()}
            </div>
          )
        )}
      </div>

      {/* Upcoming Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Upcoming</h3>
        {upcoming ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm shrink-0">
              M
            </div>
            <div className="text-sm leading-tight">
              <p className="font-medium text-gray-800">{upcoming.title}</p>
              <p className="text-xs text-gray-500">
                {format(parseISO(upcoming.meeting_date), 'dd MMMM, yyyy')} |{' '}
                {upcoming.meeting_time.slice(0, 5)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">No upcoming meetings</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPanel;
