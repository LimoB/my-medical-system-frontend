import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '@/store/store';

import StatsCard from './components/StatsCard';
import PatientList from './components/PatientList';
import ConsultationCard from './components/ConsultationCard';
import CalendarPanel from './components/CalendarPanel';
import DailyReadCard from './components/DailyRead';

const DoctorDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const doctorName = user?.first_name ? `Dr. ${user.first_name}` : 'Doctor';

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f9f9f9] p-6 font-sans">
      {/* Greeting */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Good Morning <span className="text-teal-600">{doctorName}!</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here’s a quick look at your day.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Stats */}
          <StatsCard />

          {/* Patient + Consultation */}
          <div className="flex flex-col lg:flex-row gap-6 flex-1">
            <div className="w-full lg:w-1/2">
              <PatientList />
            </div>
            <div className="w-full lg:w-1/2">
              <ConsultationCard />
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1">
            <CalendarPanel
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
          <div className="flex-1">
            <DailyReadCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
