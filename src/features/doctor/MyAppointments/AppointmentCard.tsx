import { useState } from 'react';
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

  const handleRefresh = () => window.location.reload();

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

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow border space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{patientName}</h3>
          <span className="text-sm text-gray-500">{appointment.appointment_status}</span>
        </div>

        <p className="text-sm">
          <strong>Date:</strong> {dateString} ({weekday})
        </p>
        <p className="text-sm">
          <strong>Time:</strong> {appointment.time_slot}
        </p>
        {appointment.reason && (
          <p className="text-sm text-gray-600">
            <strong>Reason:</strong> {appointment.reason}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setShowDetails(true)}
            className="text-blue-600 text-sm underline"
          >
            View Details
          </button>

          <button
            onClick={() => {
              setShowConsultationForm(true);
              setShowPrescriptionForm(false);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Make Consultation
          </button>

          <button
            onClick={() => {
              setShowPrescriptionForm(true);
              setShowConsultationForm(false);
            }}
            className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
          >
            Make Prescription
          </button>
        </div>
      </div>

      {/* Modals/Forms */}
      {showDetails && (
        <AppointmentDetails
          appointment={appointment}
          onClose={() => setShowDetails(false)}
          onRefresh={handleRefresh}
        />
      )}

      {showConsultationForm && fullPatient && (
        <div className="mt-4">
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
        <div className="mt-4">
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
