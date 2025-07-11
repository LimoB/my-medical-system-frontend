import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const StatsCard = () => {
  const visitsToday = 94;
  const newPatients = 10;
  const oldPatients = 84;
  const newPatientChange = 61;
  const oldPatientChange = -20;

  return (
    <div className="bg-dashboard-teal rounded-2xl shadow-card flex flex-col md:flex-row items-center justify-between px-6 py-6 w-full font-sans text-white">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-lg mb-1">
          Good Morning <span className="font-bold text-white">Dr. Limo!</span>
        </h2>
        <p className="text-sm text-white/70">Visits for Today</p>
        <div className="text-5xl font-extrabold mt-2 mb-6">{visitsToday}</div>

        <div className="flex gap-4 max-w-sm">
          {/* New Patients */}
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-3 flex-1 shadow-md backdrop-blur-md">
            <p className="text-sm text-white mb-1">New Patients</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{newPatients}</span>
              <span className="flex items-center text-xs bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {newPatientChange}%
              </span>
            </div>
          </div>

          {/* Old Patients */}
          <div className="bg-white bg-opacity-20 rounded-xl px-4 py-3 flex-1 shadow-md backdrop-blur-md">
            <p className="text-sm text-white mb-1">Old Patients</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{oldPatients}</span>
              <span className="flex items-center text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                {Math.abs(oldPatientChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-44 lg:w-48 ml-6 shrink-0 self-center">
        <img
          src="/doc2.jpg"
          alt="Doctor"
          className="w-full h-auto object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default StatsCard;
