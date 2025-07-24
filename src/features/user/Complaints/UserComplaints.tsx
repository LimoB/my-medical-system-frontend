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
    } catch (err) {
      toast.error('Failed to load complaints');
    }
  };

  const fetchUserAppointments = async () => {
    if (!userId) return;
    try {
      const data = await fetchAppointmentsByUserId(userId);
      setAppointments(data);
    } catch (err) {
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
    } catch (err) {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-teal-700 mb-4">My Complaints</h2>
      <p className="text-gray-600 mb-6">Submit and track your complaints here.</p>

      {/* Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-8 space-y-4 border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter complaint subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Describe your issue"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Related Appointment (optional)
          </label>
          <select
            value={relatedAppointmentId}
            onChange={(e) => setRelatedAppointmentId(Number(e.target.value) || '')}
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="">-- Select an appointment --</option>
            {appointments.map((appt) => (
              <option key={appt.appointment_id} value={appt.appointment_id}>
                {`${appt.appointment_date} at ${appt.time_slot}`}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition"
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>

      {/* Complaints List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Previous Complaints</h3>
        {complaints.length === 0 ? (
          <p className="text-gray-500">No complaints submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-lg font-medium text-teal-800">{complaint.subject}</h4>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${statusColorMap[complaint.status]}`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{complaint.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Submitted on {new Date(complaint.created_at).toLocaleString()}
                </p>
                {complaint.related_appointment_id && (
                  <p className="text-xs text-gray-500">
                    Related to appointment #{complaint.related_appointment_id}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComplaints;
