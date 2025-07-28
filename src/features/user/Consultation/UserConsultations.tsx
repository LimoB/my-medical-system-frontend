'use client';

import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays } from 'lucide-react';
import { fetchConsultationsByPatientId } from '@/services/consultations';
import type { Consultation } from '@/types/consultation';
import { format } from 'date-fns';

type UIConsultation = {
  id: number;
  symptoms: string[];
  doctor: string;
  date: string;
  reference: string;
  observation: string;
  prescription: string;
};

const ConsultationCard = ({ consultation }: { consultation: UIConsultation }) => {
  return (
    <div className="relative p-[3px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl space-y-6 transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-indigo-500" />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Consultation
          </span>
        </h2>

        <div className="space-y-4">
          {/* Symptoms */}
          <div className="flex flex-wrap gap-3">
            {consultation.symptoms.map((symptom, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-green-200 to-emerald-400 text-emerald-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow"
              >
                {symptom}
              </span>
            ))}
          </div>

          {/* Medical Details */}
          <div className="space-y-3 text-base">
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
  const [consultations, setConsultations] = useState<UIConsultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const patientId = 5; // Replace with dynamic patientId from auth context
        const data = await fetchConsultationsByPatientId(patientId);

        const transformed: UIConsultation[] = data.map((item: Consultation) => ({
          id: item.consultation_id,
          symptoms: item.symptoms?.split(',').map(s => s.trim()) ?? [],
          doctor: `${item.doctor?.user?.first_name ?? 'Dr.'} ${item.doctor?.user?.last_name ?? ''}`,
          date: item.consultation_date
            ? format(new Date(item.consultation_date), 'dd MMM yyyy')
            : 'Unknown',
          reference: item.reference_code ?? '#N/A',
          observation: item.observation ?? 'No observation provided',
          prescription: item.prescription ?? 'No prescription',
        }));

        setConsultations(transformed);
      } catch (err) {
        console.error('Failed to fetch consultations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadConsultations();
  }, []);

  return (
    <ScrollArea className="space-y-10 px-2 pb-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
        My Consultations
      </h1>

      {loading ? (
        <p className="text-gray-500 text-lg">Loading consultations...</p>
      ) : consultations.length === 0 ? (
        <p className="text-gray-500 text-lg">No consultations found.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {consultations.map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default UserConsultations;





// import React from 'react';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { CalendarDays } from 'lucide-react';

// const mockConsultations = [
//   {
//     id: 1,
//     patientName: 'Denzel White',
//     age: '28 Years 3 Months',
//     gender: 'Male',
//     symptoms: ['Fever', 'Cough', 'Heart Burn'],
//     doctor: 'Dr. Everly',
//     date: '21 April 2021',
//     reference: '#2J983K10',
//     observation: 'High fever and cough with normal hemoglobin levels.',
//     prescription: 'Paracetamol (2×/day), Diazepam (Day/Night before meal), Wikoryl',
//   },
//   {
//     id: 2,
//     patientName: 'Maya Reed',
//     age: '34 Years',
//     gender: 'Female',
//     symptoms: ['Headache', 'Nausea'],
//     doctor: 'Dr. Logan',
//     date: '02 July 2023',
//     reference: '#7A56RT88',
//     observation: 'Mild migraine, stable vitals, no infection.',
//     prescription: 'Ibuprofen (1×/day after meal), Antacid',
//   },
// ];

// const ConsultationCard = ({
//   consultation,
// }: {
//   consultation: (typeof mockConsultations)[0];
// }) => {
//   return (
//     <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
//       <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 shadow-xl space-y-4 transition-transform hover:scale-[1.015] duration-300">
//         <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//           <CalendarDays className="w-5 h-5 text-indigo-500" />
//           <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//             Consultation
//           </span>
//         </h2>

//         <div className="space-y-3">
//           {/* Patient Info */}
//           <div>
//             <p className="text-base font-bold text-gray-800">{consultation.patientName}</p>
//             <p className="text-sm text-gray-500">
//               {consultation.gender} · {consultation.age}
//             </p>
//           </div>

//           {/* Symptoms */}
//           <div className="flex flex-wrap gap-2">
//             {consultation.symptoms.map((symptom, i) => (
//               <span
//                 key={i}
//                 className="bg-gradient-to-r from-green-200 to-emerald-400 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
//               >
//                 {symptom}
//               </span>
//             ))}
//           </div>

//           {/* Medical Details */}
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="font-semibold text-gray-700">Last Checked:</span>{' '}
//               <span className="text-indigo-600">{consultation.doctor}</span> on{' '}
//               <span className="text-gray-700">{consultation.date}</span>{' '}
//               <span className="text-sm text-gray-400">({consultation.reference})</span>
//             </p>
//             <p>
//               <span className="font-semibold text-gray-700">Observation:</span>{' '}
//               <span className="text-gray-800">{consultation.observation}</span>
//             </p>
//             <p>
//               <span className="font-semibold text-gray-700">Prescription:</span>{' '}
//               <span className="text-gray-700">{consultation.prescription}</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UserConsultations: React.FC = () => {
//   return (
//     <ScrollArea className="space-y-8 px-1 pb-4">
//       <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4">
//         My Consultations
//       </h1>
//       <div className="grid sm:grid-cols-2 gap-6">
//         {mockConsultations.map((consultation) => (
//           <ConsultationCard key={consultation.id} consultation={consultation} />
//         ))}
//       </div>
//     </ScrollArea>
//   );
// };

// export default UserConsultations;
