import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import type { RootState } from '@/store/store';
import { getDoctorByUserId } from '@/services/doctors';
import type { AppointmentSummary, SanitizedDoctor } from '@/types/doctor';

const StatsCard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [visitsToday, setVisitsToday] = useState(0);
  const [newPatients, setNewPatients] = useState(0);
  const [oldPatients, setOldPatients] = useState(0);
  const [newPatientChange, setNewPatientChange] = useState(0);
  const [oldPatientChange, setOldPatientChange] = useState(0);

  const fullName = user?.first_name
    ? `Dr. ${user.first_name} ${user.last_name}`
    : user?.email || 'Doctor';

  const doctorImage = user?.image_url || '/default-doctor.jpg';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user?.user_id) return;

        const doctor: SanitizedDoctor = await getDoctorByUserId(user.user_id);

        const today = dayjs().format('YYYY-MM-DD');
        const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

        const todayVisits = doctor.appointments.filter(
          (app) => dayjs(app.appointment_date).format('YYYY-MM-DD') === today
        );

        const yesterdayVisits = doctor.appointments.filter(
          (app) => dayjs(app.appointment_date).format('YYYY-MM-DD') === yesterday
        );

        const visitCount = todayVisits.length;

        // Track each patient's first-ever appointment date
        const patientVisitMap = new Map<number, string>();
        doctor.appointments.forEach((app: AppointmentSummary) => {
          const patientId = app.user?.user_id;
          if (!patientId) return;
          const visitDate = dayjs(app.appointment_date).format('YYYY-MM-DD');
          const existing = patientVisitMap.get(patientId);
          if (!existing || dayjs(visitDate).isBefore(existing)) {
            patientVisitMap.set(patientId, visitDate);
          }
        });

        const newTodayPatients = Array.from(patientVisitMap.values()).filter(
          (firstVisitDate) => firstVisitDate === today
        );
        const newYesterdayPatients = Array.from(patientVisitMap.values()).filter(
          (firstVisitDate) => firstVisitDate === yesterday
        );

        const newCount = newTodayPatients.length;
        const oldCount = visitCount - newCount;

        const calcChange = (todayVal: number, yesterdayVal: number) => {
          if (yesterdayVal === 0) return todayVal > 0 ? 100 : 0;
          return Math.round(((todayVal - yesterdayVal) / yesterdayVal) * 100);
        };

        setVisitsToday(visitCount);
        setNewPatients(newCount);
        setOldPatients(oldCount >= 0 ? oldCount : 0);
        setNewPatientChange(calcChange(newCount, newYesterdayPatients.length));
        setOldPatientChange(
          calcChange(oldCount, yesterdayVisits.length - newYesterdayPatients.length)
        );
      } catch (err) {
        console.error('Stats error:', err);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="bg-dashboard-teal rounded-2xl shadow-card flex flex-col md:flex-row items-center justify-between px-6 py-6 w-full font-sans text-white">
      <div className="flex-1">
        <h2 className="text-lg mb-1 font-bold">Visits for Today</h2>
        <div className="text-5xl font-extrabold mt-2 mb-6">{visitsToday}</div>

        <div className="flex gap-4 max-w-sm">
          {/* New Patients */}
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-3 flex-1 shadow-md backdrop-blur-md">
            <p className="text-sm text-white mb-1">New Patients</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{newPatients}</span>
              <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full 
                ${newPatientChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                {newPatientChange >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(newPatientChange)}%
              </span>
            </div>
          </div>

          {/* Old Patients */}
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-3 flex-1 shadow-md backdrop-blur-md">
            <p className="text-sm text-white mb-1">Old Patients</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{oldPatients}</span>
              <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full 
                ${oldPatientChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                {oldPatientChange >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(oldPatientChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-44 lg:w-48 ml-6 shrink-0 self-center">
        <img
          src={doctorImage}
          alt={fullName}
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-doctor.jpg';
          }}
        />
      </div>
    </div>
  );
};

export default StatsCard;
