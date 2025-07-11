import { format, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const CalendarPanel = () => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy');
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(startOfMonth(currentDate)); // 0 = Sunday
  const markedDates = [8, 14, 21];

  const calendarDays = useMemo(() => {
    const blanks = Array(startWeekday).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
  }, [daysInMonth, startWeekday]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full h-full font-sans flex flex-col justify-between">
      {/* 🗓️ Current Month */}
      <div className="text-center mb-4">
        <p className="text-base font-bold text-gray-900">{currentMonth}</p>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-3 text-center text-sm text-gray-800">
        {calendarDays.map((day, idx) =>
          day === null ? (
            <div key={`blank-${idx}`}></div>
          ) : (
            <div
              key={day}
              className="relative h-8 w-8 mx-auto flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer transition"
            >
              {day}
              {markedDates.includes(day) && (
                <motion.span
                  layoutId={`dot-${day}`}
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-emerald-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </div>
          )
        )}
      </div>

      {/* 📌 Upcoming Event */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Upcoming</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start gap-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-cyan-100 text-cyan-700 font-bold text-sm shrink-0">
            M
          </div>
          <div className="text-sm leading-tight">
            <p className="font-medium text-gray-800">Monthly doctor's meet</p>
            <p className="text-xs text-gray-500">8 April, 2021 | 04:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPanel;
