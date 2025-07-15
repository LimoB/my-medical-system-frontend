import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDoctorPatients, deletePatientAppointment } from '@/services/doctors';
import type { DoctorPatient } from '@/types/doctor';
import type { RootState } from '@/store/store';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const Patients = () => {
  const [patients, setPatients] = useState<DoctorPatient[]>([]);
  const [filtered, setFiltered] = useState<DoctorPatient[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user || user.role !== 'doctor') {
        setError('Only doctors can view patients.');
        setLoading(false);
        return;
      }

      try {
        const data = await getDoctorPatients();
        setPatients(data);
      } catch (err) {
        console.error('❌ Failed to fetch patients:', err);
        setError('Failed to fetch patients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [user]);

  useEffect(() => {
    const filtered = patients.filter((p) => {
      const fullName = `${p.user.first_name} ${p.user.last_name}`.toLowerCase();
      const matchSearch =
        fullName.includes(search.toLowerCase()) ||
        p.user.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status ? p.status === status : true;

      return matchSearch && matchStatus;
    });
    setFiltered(filtered);
    setCurrentPage(1); // reset to page 1 on filter change
  }, [search, status, patients]);

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to remove this patient history?')) return;

    setDeletingId(userId);
    try {
      await deletePatientAppointment(userId);
      toast.success('Patient record deleted');
      setPatients((prev) => prev.filter((p) => p.user.user_id !== userId));
    } catch (err: any) {
      console.error('❌ Error deleting patient:', err);
      toast.error(err?.message || 'Failed to delete patient');
    } finally {
      setDeletingId(null);
    }
  };

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  if (loading) return <div className="p-4 text-gray-600">Loading patients...</div>;
  if (error) return <div className="p-4 text-red-600 font-medium">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Patients</h2>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-gray-500">No patients found.</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((p) => (
              <div
                key={p.user.user_id}
                className="relative border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(p.user.user_id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  disabled={deletingId === p.user.user_id}
                  title="Delete Patient"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={p.user.image_url || '/default-avatar.jpg'}
                    alt={`${p.user.first_name} ${p.user.last_name}`}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {p.user.first_name} {p.user.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{p.user.email}</p>
                    <p className="text-sm text-gray-500">{p.user.contact_phone}</p>
                  </div>
                </div>

                {/* Appointment Info */}
                <div className="text-sm text-gray-700 space-y-1 mb-3">
                  <p><strong>Date:</strong> {p.appointmentDate ? new Date(p.appointmentDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Time:</strong> {p.timeSlot || 'N/A'}</p>
                  <p><strong>Status:</strong> {p.status || 'Unknown'}</p>
                </div>

                {/* Additional user info */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Address:</strong> {p.user.address || 'N/A'}</p>
                  <p><strong>Verified:</strong> {p.user.is_verified ? 'Yes' : 'No'}</p>
                  <p><strong>Last Login:</strong> {p.user.last_login ? new Date(p.user.last_login).toLocaleString() : 'N/A'}</p>
                  <p><strong>Joined:</strong> {p.user.created_at ? new Date(p.user.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
