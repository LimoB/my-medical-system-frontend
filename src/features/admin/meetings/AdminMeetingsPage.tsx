import { useEffect, useState } from 'react';
import {
    getMeetings,
    createMeeting,
    deleteMeeting,
} from '@/services/meeting';
import type { CreateMeetingPayload, Meeting } from '@/types/meeting';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

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
            <h2 className="text-2xl font-bold text-gray-800">Manage Meetings</h2>

            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
                <h3 className="text-lg font-semibold">Create New Meeting</h3>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="meeting_date"
                        value={form.meeting_date}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="time"
                        name="meeting_time"
                        value={form.meeting_time}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="is_global"
                        checked={form.is_global}
                        onChange={handleChange}
                    />
                    <span className="text-sm text-gray-700">Is Global (for all doctors)?</span>
                </label>
                <button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded inline-flex items-center gap-2"
                >
                    <Plus size={18} /> Add Meeting
                </button>
            </div>

            {/* Meeting List */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-4">All Meetings</h3>
                <table className="w-full text-sm text-left border-t">
                    <thead>
                        <tr className="border-b text-gray-700">
                            <th className="py-2">Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Global?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.map((meeting) => (
                            <tr key={meeting.meeting_id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{meeting.title}</td>
                                <td>{meeting.description}</td>
                                <td>{format(new Date(meeting.meeting_date), 'yyyy-MM-dd')}</td>
                                <td>{meeting.meeting_time}</td>
                                <td>{meeting.is_global ? '✅' : '❌'}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(meeting.meeting_id)}
                                        className="text-red-600 hover:underline flex items-center gap-1"
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
            </div>
        </div>
    );
};

export default AdminMeetingsPage;
