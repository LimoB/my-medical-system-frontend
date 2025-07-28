import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { fetchComplaintsByCurrentUser } from '@/services/complaints';
import { fetchAppointmentsByUserId } from '@/services/appointments';
import api from '@/services/axios';
import type { Complaint, ComplaintStatus } from '@/types/complaints';
import type { Appointment } from '@/types/appointment';
import type { RootState } from '@/store/store';

const statusColorMap: Record<ComplaintStatus, string> = {
  Open: 'bg-red-100 text-red-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
  Closed: 'bg-gray-200 text-gray-700',
};

const UserComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedAppointmentId, setRelatedAppointmentId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state: RootState) => state.auth.user?.user_id);

  const fetchUserComplaints = async () => {
    try {
      const data = await fetchComplaintsByCurrentUser();
      setComplaints(data);
    } catch {
      toast.error('Failed to load complaints');
    }
  };

  const fetchUserAppointments = async () => {
    if (!userId) return;
    try {
      const data = await fetchAppointmentsByUserId(userId);
      setAppointments(data);
    } catch {
      toast.error('Failed to load appointments');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.warning('Please fill all fields');
      return;
    }

    const payload = {
      subject,
      description,
      related_appointment_id: relatedAppointmentId || null,
    };

    try {
      setLoading(true);
      await api.post('/complaints', payload);
      toast.success('Complaint submitted successfully');
      setSubject('');
      setDescription('');
      setRelatedAppointmentId('');
      await fetchUserComplaints();
    } catch {
      toast.error('Error submitting complaint');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserComplaints();
    fetchUserAppointments();
  }, [userId]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-teal-700 mb-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-transparent bg-clip-text">
        My Complaints
      </h2>
      <p className="text-gray-600 mb-8">Submit and track your complaints below.</p>

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border p-6 shadow-md space-y-6 mb-10"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="e.g. Appointment delay issue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Explain your issue clearly..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Related Appointment <span className="text-gray-400">(optional)</span>
          </label>

          {appointments.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No appointments found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {appointments.map((appt) => {
                const isSelected = relatedAppointmentId === appt.appointment_id;
                return (
                  <button
                    key={appt.appointment_id}
                    type="button"
                    onClick={() =>
                      setRelatedAppointmentId(
                        relatedAppointmentId === appt.appointment_id ? '' : appt.appointment_id
                      )
                    }
                    className={`border rounded-xl px-4 py-3 text-left transition shadow-sm ${isSelected
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-white text-gray-800 hover:bg-teal-50'
                      }`}
                  >
                    <p className="font-medium">{appt.appointment_date}</p>
                    <p className="text-sm">
                      Time: {appt.time_slot}
                      <br />
                      Doctor:{' '}
                      <span className="font-semibold">
                        {appt.doctor?.user
                          ? `${appt.doctor.user.first_name} ${appt.doctor.user.last_name}`
                          : 'Unknown'}
                      </span>
                    </p>
                  </button>

                );
              })}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>

      {/* Complaints List */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Previous Complaints</h3>

        {complaints.length === 0 ? (
          <p className="text-gray-500 text-center">No complaints submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{complaint.subject}</h4>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColorMap[complaint.status]}`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{complaint.description}</p>

                <div className="mt-3 text-xs text-gray-500 space-y-1">
                  <p>Submitted on: {new Date(complaint.created_at).toLocaleString()}</p>
                  {complaint.related_appointment_id && (
                    <p>Related to appointment #{complaint.related_appointment_id}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComplaints;
