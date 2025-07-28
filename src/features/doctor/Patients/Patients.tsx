import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDoctorPatients, deletePatientAppointment } from '@/services/doctors';
import type { DoctorPatient } from '@/types/doctor';
import type { RootState } from '@/store/store';
import { toast } from 'react-toastify';
import PatientCard from './PatientCard';
import PatientSkeleton from './PatientSkeleton';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ITEMS_PER_PAGE = 6;

const Patients = () => {
  const [patients, setPatients] = useState<DoctorPatient[]>([]);
  const [filtered, setFiltered] = useState<DoctorPatient[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; userId: number | null }>({
    open: false,
    userId: null,
  });

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user || user.role !== 'doctor') {
        setError('Access restricted. Only doctors can view patients.');
        setLoading(false);
        return;
      }

      try {
        const data = await getDoctorPatients();
        setPatients(data);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
        setError('Unable to load patients. Please try again later.');
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
    setCurrentPage(1);
  }, [search, status, patients]);

  const handleDelete = async (userId: number) => {
    setDeletingId(userId);
    try {
      await deletePatientAppointment(userId);
      toast.success('Patient record deleted successfully.');
      setPatients((prev) => prev.filter((p) => p.user.user_id !== userId));
    } catch (err: any) {
      console.error('Error deleting patient:', err);
      toast.error(err?.message || 'Failed to delete patient.');
    } finally {
      setDeletingId(null);
    }
  };

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600 mb-6">
        Patient Records
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-56 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-sky-300 outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PatientSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 text-center">No patient records found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((p) => (
              <PatientCard
                key={p.user.user_id}
                patient={p}
                onDelete={() => setConfirmModal({ open: true, userId: p.user.user_id })}
                deleting={deletingId === p.user.user_id}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md transition font-medium ${
                    currentPage === i + 1
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Confirm Modal */}
      <DeleteConfirmationModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, userId: null })}
        onConfirm={() => {
          if (confirmModal.userId) handleDelete(confirmModal.userId);
          setConfirmModal({ open: false, userId: null });
        }}
        name={
          patients.find((p) => p.user.user_id === confirmModal.userId)?.user.first_name ||
          'this patient'
        }
      />
    </div>
  );
};

export default Patients;
