import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CalendarClock, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import {
  getMeetings,
  createMeeting,
  deleteMeeting,
} from '@/services/meeting';
import type { CreateMeetingPayload, Meeting } from '@/types/meeting';

const AdminMeetingsPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [form, setForm] = useState<CreateMeetingPayload>({
    title: '',
    description: '',
    meeting_date: '',
    meeting_time: '',
    is_global: false,
  });

  const fetchMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (err) {
      toast.error('Failed to load meetings');
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createMeeting(form);
      toast.success('Meeting created');
      setForm({
        title: '',
        description: '',
        meeting_date: '',
        meeting_time: '',
        is_global: false,
      });
      fetchMeetings();
    } catch (err) {
      toast.error('Failed to create meeting');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    try {
      await deleteMeeting(id);
      toast.success('Meeting deleted');
      fetchMeetings();
    } catch (err) {
      toast.error('Failed to delete meeting');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-6">
        <CalendarClock className="text-emerald-600" size={30} />
        <span>Admin Meeting Manager</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-100 via-white to-emerald-50 p-6 rounded-2xl shadow-xl space-y-4"
        >
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
            Create New Meeting
          </h3>
          <input
            name="title"
            placeholder="Meeting Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <textarea
            name="description"
            placeholder="Meeting Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="meeting_date"
              value={form.meeting_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="time"
              name="meeting_time"
              value={form.meeting_time}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="is_global"
              checked={form.is_global}
              onChange={handleChange}
              className="rounded"
            />
            Visible to all doctors?
          </label>
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition shadow-md"
          >
            <Plus size={18} /> Add Meeting
          </button>
        </motion.div>

        {/* Meeting List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Meetings
          </h3>
          <table className="w-full text-sm text-left border-t border-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 uppercase text-xs tracking-wide">
                <th className="py-2 px-3">Title</th>
                <th className="px-3">Description</th>
                <th className="px-3">Date</th>
                <th className="px-3">Time</th>
                <th className="px-3 text-center">Global</th>
                <th className="px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr
                  key={meeting.meeting_id}
                  className="border-t border-gray-100 hover:bg-emerald-50 transition"
                >
                  <td className="py-2 px-3 font-medium text-gray-800">
                    {meeting.title}
                  </td>
                  <td className="px-3 text-gray-700">{meeting.description}</td>
                  <td className="px-3 text-gray-600">
                    {format(new Date(meeting.meeting_date), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-3 text-gray-600">{meeting.meeting_time}</td>
                  <td className="px-3 text-center">
                    {meeting.is_global ? (
                      <Users className="text-emerald-600 mx-auto" size={18} />
                    ) : (
                      <Users className="text-gray-400 mx-auto" size={18} />
                    )}
                  </td>
                  <td className="px-3">
                    <button
                      onClick={() => handleDelete(meeting.meeting_id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {meetings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No meetings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminMeetingsPage;
