import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays } from 'lucide-react';

const mockConsultations = [
  {
    id: 1,
    patientName: 'Denzel White',
    age: '28 Years 3 Months',
    gender: 'Male',
    symptoms: ['Fever', 'Cough', 'Heart Burn'],
    doctor: 'Dr. Everly',
    date: '21 April 2021',
    reference: '#2J983K10',
    observation: 'High fever and cough with normal hemoglobin levels.',
    prescription: 'Paracetamol (2×/day), Diazepam (Day/Night before meal), Wikoryl',
  },
  {
    id: 2,
    patientName: 'Maya Reed',
    age: '34 Years',
    gender: 'Female',
    symptoms: ['Headache', 'Nausea'],
    doctor: 'Dr. Logan',
    date: '02 July 2023',
    reference: '#7A56RT88',
    observation: 'Mild migraine, stable vitals, no infection.',
    prescription: 'Ibuprofen (1×/day after meal), Antacid',
  },
];

const ConsultationCard = ({
  consultation,
}: {
  consultation: (typeof mockConsultations)[0];
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md w-full space-y-3">
      <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-gray-500" />
        Consultation
      </h2>

      <div className="bg-gray-50 p-5 rounded-xl space-y-4">
        {/* Patient Info */}
        <div>
          <p className="text-base font-bold text-gray-900">{consultation.patientName}</p>
          <p className="text-sm text-gray-400 leading-tight">
            {consultation.gender} · {consultation.age}
          </p>
        </div>

        {/* Symptoms */}
        <div className="flex flex-wrap gap-2">
          {consultation.symptoms.map((symptom, i) => (
            <span
              key={i}
              className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {symptom}
            </span>
          ))}
        </div>

        {/* Medical Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Last Checked:</span>{' '}
            <span className="text-blue-600">{consultation.doctor}</span> on {consultation.date}{' '}
            ({consultation.reference})
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Observation:</span> {consultation.observation}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold text-gray-700">Prescription:</span>{' '}
            {consultation.prescription}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserConsultations: React.FC = () => {
  return (
    <ScrollArea className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Consultations</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {mockConsultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default UserConsultations;
