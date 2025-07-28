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
    <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow-xl space-y-4 transition-transform hover:scale-[1.015] duration-300">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-500" />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Consultation
          </span>
        </h2>

        <div className="space-y-3">
          {/* Patient Info */}
          <div>
            <p className="text-base font-bold text-gray-800">{consultation.patientName}</p>
            <p className="text-sm text-gray-500">
              {consultation.gender} · {consultation.age}
            </p>
          </div>

          {/* Symptoms */}
          <div className="flex flex-wrap gap-2">
            {consultation.symptoms.map((symptom, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-green-200 to-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
              >
                {symptom}
              </span>
            ))}
          </div>

          {/* Medical Details */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-gray-700">Last Checked:</span>{' '}
              <span className="text-indigo-600">{consultation.doctor}</span> on{' '}
              <span className="text-gray-700">{consultation.date}</span>{' '}
              <span className="text-sm text-gray-400">({consultation.reference})</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Observation:</span>{' '}
              <span className="text-gray-800">{consultation.observation}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Prescription:</span>{' '}
              <span className="text-gray-700">{consultation.prescription}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserConsultations: React.FC = () => {
  return (
    <ScrollArea className="space-y-8 px-1 pb-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
        My Consultations
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {mockConsultations.map((consultation) => (
          <ConsultationCard key={consultation.id} consultation={consultation} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default UserConsultations;
