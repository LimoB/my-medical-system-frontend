const ConsultationCard = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg w-full h-full">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Consultation</h2>

      <div className="bg-gray-50 p-5 rounded-xl space-y-4 shadow-inner">
        {/* 👤 Patient Info */}
        <div>
          <p className="text-base font-bold text-gray-900">Denzel White</p>
          <p className="text-sm text-gray-400 leading-tight">Male · 28 Years 3 Months</p>
        </div>

        {/* 💊 Symptoms */}
        <div className="flex flex-wrap gap-2">
          {['Fever', 'Cough', 'Heart Burn'].map((symptom, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {symptom}
            </span>
          ))}
        </div>

        {/* 📋 Medical Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Last Checked:</span>{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Dr. Everly on 21 April 2021 (#2J983K10)
            </a>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Observation:</span>{' '}
            High fever and cough with normal hemoglobin levels.
          </p>
          <p className="text-gray-500">
            <span className="font-semibold text-gray-700">Prescription:</span>{' '}
            Paracetamol (2×/day), Diazepam (Day/Night before meal), Wikoryl
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
