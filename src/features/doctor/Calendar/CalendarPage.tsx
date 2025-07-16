import { useState, useEffect } from 'react';
import { parseISO, isSameDay, getMonth, getDate } from 'date-fns';
import CalendarPanel from '@/features/doctor/Dashboard/components/CalendarPanel';
import { getMeetings } from '@/services/meeting';
import { fetchAppointmentsByDoctor } from '@/services/appointments';
import type { Meeting } from '@/types/meeting';
import type { Appointment } from '@/types/appointment';
import { CalendarDays, Stethoscope } from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [m, a] = await Promise.all([
          getMeetings(),
          fetchAppointmentsByDoctor(),
        ]);

        setMeetings(m);
        setAppointments(a);
      } catch (err) {
        console.error('❌ Failed to fetch calendar data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filteredMeetings = meetings.filter((m) =>
    isSameDay(parseISO(m.meeting_date), selectedDate)
  );

  const filteredAppointments = appointments.filter((a) =>
    isSameDay(parseISO(a.appointment_date), selectedDate)
  );

  // Combine meeting and appointment dates for current month
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const meetingDays = meetings
    .map((m) => parseISO(m.meeting_date))
    .filter((d) => getMonth(d) === currentMonth && d.getFullYear() === currentYear)
    .map((d) => getDate(d));

  const appointmentDays = appointments
    .map((a) => parseISO(a.appointment_date))
    .filter((d) => getMonth(d) === currentMonth && d.getFullYear() === currentYear)
    .map((d) => getDate(d));

  const combinedMarkedDates = Array.from(
    new Set([...meetingDays, ...appointmentDays])
  ).map((day) => {
    const hasMeeting = meetingDays.includes(day);
    const hasAppointment = appointmentDays.includes(day);
    return { day, hasMeeting, hasAppointment };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans">
      {/* Left: Calendar */}
      <div>
        <CalendarPanel
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          markedDates={combinedMarkedDates}
        />
      </div>

      {/* Right: Daily Breakdown */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Schedule for {selectedDate.toDateString()}
        </h2>

        {/* Meetings Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            Doctor Meetings
          </h3>
          <div className="space-y-2 mt-2">
            {filteredMeetings.length === 0 ? (
              <p className="text-sm text-gray-500">No meetings for this day.</p>
            ) : (
              filteredMeetings.map((m) => (
                <div
                  key={m.meeting_id}
                  className="bg-white p-4 rounded-xl shadow-sm border text-sm"
                >
                  <p className="font-medium text-gray-800">{m.title}</p>
                  <p className="text-gray-500">{m.meeting_time}</p>
                  <p className="text-gray-600">{m.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Appointments Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-cyan-600" />
            Appointments
          </h3>
          <div className="space-y-2 mt-2">
            {filteredAppointments.length === 0 ? (
              <p className="text-sm text-gray-500">No appointments for this day.</p>
            ) : (
              filteredAppointments.map((a) => (
                <div
                  key={a.appointment_id}
                  className="bg-white p-4 rounded-xl shadow-sm border text-sm"
                >
                  <p className="font-medium text-gray-800">
                    Patient: {a.patient?.first_name} {a.patient?.last_name}
                  </p>
                  <p className="text-gray-500">Time: {a.appointment_time}</p>
                  <p className="text-gray-600">
                    Reason: {a.reason || 'N/A'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
