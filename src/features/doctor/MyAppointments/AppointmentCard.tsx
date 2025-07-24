import { useState } from 'react';
import { toast } from 'react-toastify';
import { FilePlus, ClipboardCheck, Eye } from 'lucide-react';
import type { Appointment } from '@/types/appointment';
import type { User } from '@/types/user';
import AppointmentDetails from './AppointmentDetails';
import ConsultationForm from './ConsultationForm';
import PrescriptionForm from './PrescriptionForm';

type Props = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const patient = appointment.user ?? null;
  const patientName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : 'Unknown';

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toast[type](message);
  };

  const handleRefresh = () => {
    showToast('Refreshed!');
    // Reload logic can go here or be handled by parent
  };

  const fullPatient: User | null = patient
    ? {
        ...patient,
        image_url: patient.image_url ?? '',
        role: (patient.role ?? 'user') as 'user' | 'admin' | 'doctor',
        contact_phone: patient.contact_phone ?? '',
        address: patient.address ?? '',
      }
    : null;

  const dateObj = new Date(appointment.appointment_date);
  const dateString = dateObj.toLocaleDateString();
  const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Failed: 'bg-gray-200 text-gray-700',
  }[appointment.appointment_status] ?? 'bg-gray-100 text-gray-800';

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-md border space-y-3 transition duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{patientName}</h3>
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor}`}
          >
            {appointment.appointment_status}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-700">
          <p><strong>Date:</strong> {dateString} ({weekday})</p>
          <p><strong>Time:</strong> {appointment.time_slot}</p>
          {appointment.reason && (
            <p><strong>Reason:</strong> {appointment.reason}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-1 text-blue-600 text-sm underline hover:text-blue-800 transition"
          >
            <Eye className="w-4 h-4" /> View Details
          </button>

          <button
            onClick={() => {
              setShowConsultationForm(true);
              setShowPrescriptionForm(false);
            }}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
          >
            <ClipboardCheck className="w-4 h-4" /> Make Consultation
          </button>

          <button
            onClick={() => {
              setShowPrescriptionForm(true);
              setShowConsultationForm(false);
            }}
            className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition"
          >
            <FilePlus className="w-4 h-4" /> Make Prescription
          </button>
        </div>
      </div>

      {/* Modals/Forms */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 transition-opacity duration-300">
          <AppointmentDetails
            appointment={appointment}
            onClose={() => setShowDetails(false)}
            onRefresh={handleRefresh}
          />
        </div>
      )}

      {showConsultationForm && fullPatient && (
        <div className="mt-4 animate-fadeIn">
          <ConsultationForm
            appointment={appointment}
            patient={fullPatient}
            onClose={() => setShowConsultationForm(false)}
            onRefresh={handleRefresh}
            disabled={false}
          />
        </div>
      )}

      {showPrescriptionForm && fullPatient && (
        <div className="mt-4 animate-fadeIn">
          <PrescriptionForm
            appointment={appointment}
            patient={fullPatient}
            onClose={() => setShowPrescriptionForm(false)}
            onRefresh={handleRefresh}
            disabled={false}
          />
        </div>
      )}
    </>
  );
};

export default AppointmentCard;





// import { useState, useEffect, type ChangeEvent } from 'react';
// import { FilePlus, ClipboardCheck } from 'lucide-react';
// import type { Appointment } from '@/types/appointment';
// import type { User } from '@/types/user';
// import { toast } from 'react-toastify';
// import {
//   updateAppointmentStatus,
//   deleteAppointment,
// } from '@/services/appointments';
// import { fetchUserById } from '@/services/users';
// import ConsultationForm from './ConsultationForm';
// import PrescriptionForm from './PrescriptionForm';

// type Props = {
//   appointment: Appointment;
// };

// const AppointmentCard = ({ appointment }: Props) => {
//   const [status, setStatus] = useState<
//     'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Failed'
//   >(appointment.appointment_status);
//   const [loading, setLoading] = useState(false);
//   const [patient, setPatient] = useState<User | null>(null);
//   const [showConsultationForm, setShowConsultationForm] = useState(false);
//   const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

//   const showToast = (message: string, type: 'success' | 'error' = 'success') => {
//     toast[type](message);
//   };

//   const handleRefresh = () => {
//     showToast('Refreshed!');
//     // Optionally re-fetch data
//   };

//   const fullPatient: User | null = patient
//     ? {
//         ...patient,
//         image_url: patient.image_url ?? '',
//         role: (patient.role ?? 'user') as 'user' | 'admin' | 'doctor',
//         contact_phone: patient.contact_phone ?? '',
//         address: patient.address ?? '',
//       }
//     : null;

//   useEffect(() => {
//     const loadUser = async () => {
//       if (!appointment.user_id) return;
//       try {
//         const user = await fetchUserById(appointment.user_id);
//         setPatient(user);
//       } catch (err) {
//         console.error('Failed to load patient profile:', err);
//       }
//     };
//     loadUser();
//   }, [appointment.user_id]);

//   const handleStatusChange = async () => {
//     try {
//       setLoading(true);
//       await updateAppointmentStatus(appointment.appointment_id, { status });
//       showToast('Status updated');
//     } catch (err) {
//       console.error('Error updating status:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this appointment?')) return;
//     try {
//       setLoading(true);
//       await deleteAppointment(appointment.appointment_id);
//       showToast('Appointment deleted');
//     } catch (err) {
//       console.error('Error deleting appointment:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const appointmentDate = new Date(appointment.appointment_date);
//   const formattedDate = appointmentDate.toLocaleDateString();
//   const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });

//   return (
//     <>
//       <div className="bg-white p-5 rounded-xl shadow-md border space-y-4 transition duration-300 hover:shadow-lg w-full">
//         <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
//           Appointment Details
//         </h2>

//         {patient ? (
//           <div className="flex gap-4 items-center border p-4 rounded-lg bg-gray-50">
//             <img
//               src={patient.image_url ?? ''}
//               alt={`${patient.first_name} ${patient.last_name}`}
//               className="w-20 h-20 rounded-full object-cover border shadow"
//             />
//             <div className="space-y-1 text-sm">
//               <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
//               <p><strong>Email:</strong> {patient.email}</p>
//               <p><strong>Phone:</strong> {patient.contact_phone}</p>
//               <p><strong>Address:</strong> {patient.address}</p>
//               <p><strong>Role:</strong> {patient.role}</p>
//             </div>
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">Loading patient info...</p>
//         )}

//         <div className="space-y-2 text-sm text-gray-700">
//           <p><strong>Date:</strong> {formattedDate} ({dayOfWeek})</p>
//           <p><strong>Time:</strong> {appointment.time_slot}</p>
//           {appointment.reason && (
//             <p><strong>Reason:</strong> {appointment.reason}</p>
//           )}

//           <div>
//             <label className="block font-medium mt-2 mb-1">Status</label>
//             <select
//               value={status}
//               onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                 setStatus(
//                   e.target.value as
//                     | 'Pending'
//                     | 'Confirmed'
//                     | 'Cancelled'
//                     | 'Completed'
//                 )
//               }
//               disabled={loading}
//               className="w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Pending">Pending</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Cancelled">Cancelled</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-between flex-wrap gap-3 pt-4">
//           <button
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm"
//             disabled={loading}
//           >
//             Delete
//           </button>

//           <button
//             onClick={handleStatusChange}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
//             disabled={loading}
//           >
//             Update Status
//           </button>

//           <button
//             onClick={() => {
//               setShowConsultationForm(true);
//               setShowPrescriptionForm(false);
//             }}
//             className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition text-sm"
//           >
//             <ClipboardCheck className="w-4 h-4" />
//             Make Consultation
//           </button>

//           <button
//             onClick={() => {
//               setShowPrescriptionForm(true);
//               setShowConsultationForm(false);
//             }}
//             className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 transition text-sm"
//           >
//             <FilePlus className="w-4 h-4" />
//             Make Prescription
//           </button>
//         </div>
//       </div>

//       {/* Forms */}
//       {showConsultationForm && fullPatient && (
//         <div className="mt-4 animate-fadeIn">
//           <ConsultationForm
//             appointment={appointment}
//             patient={fullPatient}
//             onClose={() => setShowConsultationForm(false)}
//             onRefresh={handleRefresh}
//             disabled={false}
//           />
//         </div>
//       )}

//       {showPrescriptionForm && fullPatient && (
//         <div className="mt-4 animate-fadeIn">
//           <PrescriptionForm
//             appointment={appointment}
//             patient={fullPatient}
//             onClose={() => setShowPrescriptionForm(false)}
//             onRefresh={handleRefresh}
//             disabled={false}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default AppointmentCard;
