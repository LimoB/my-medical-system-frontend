// src/features/admin/ManageAppointments/Appointments.tsx

import { useState } from 'react';
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppointmentTable from './AppointmentTable';
import AppointmentDetails from './AppointmentDetails';
import { useAppointments } from './useAppointments';
import type { Appointment } from '@/types/appointment';

const ManageAppointments = () => {
  const {
    appointments,
    loading,
    error,
    refresh,
  } = useAppointments();

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-white text-gray-800">
      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover />

      <main className="flex-1 p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-900">Manage Appointments</h1>
        </div>

        {/* Status Messages */}
        {loading ? (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader className="animate-spin" size={20} />
            Loading appointments...
          </div>
        ) : error ? (
          <p className="text-red-600 font-medium">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <AppointmentTable
            appointments={appointments}
            onView={(appt) => setSelectedAppointment(appt)}
          />
        )}

        {/* Details Modal */}
        {selectedAppointment && (
          <AppointmentDetails
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onUpdated={refresh}
          />
        )}
      </main>
    </div>
  );
};

export default ManageAppointments;
