import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import type { SanitizedDoctor } from '@/types/doctor';

interface Props {
  doctors: SanitizedDoctor[];
  onView: (doctor: SanitizedDoctor) => void;
  onEdit: (doctor: SanitizedDoctor) => void;
  onDelete: (id: number) => void;
  onBulkDelete?: (ids: number[]) => void;
}

const PAGE_SIZE = 5;

const DoctorTable = ({ doctors, onView, onEdit, onDelete, onBulkDelete }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'specialization'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const name = `${doc.user?.first_name ?? ''} ${doc.user?.last_name ?? ''}`.toLowerCase();
      const spec = doc.specialization?.toLowerCase() || '';
      return name.includes(searchTerm.toLowerCase()) || spec.includes(searchTerm.toLowerCase());
    });
  }, [doctors, searchTerm]);

  const sortedDoctors = useMemo(() => {
    return [...filteredDoctors].sort((a, b) => {
      const aValue =
        sortKey === 'name'
          ? `${a.user?.first_name ?? ''} ${a.user?.last_name ?? ''}`.toLowerCase()
          : a.specialization?.toLowerCase() || '';
      const bValue =
        sortKey === 'name'
          ? `${b.user?.first_name ?? ''} ${b.user?.last_name ?? ''}`.toLowerCase()
          : b.specialization?.toLowerCase() || '';

      return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }, [filteredDoctors, sortKey, sortAsc]);

  const paginatedDoctors = useMemo(() => {
    const start = page * PAGE_SIZE;
    return sortedDoctors.slice(start, start + PAGE_SIZE);
  }, [sortedDoctors, page]);

  const toggleSort = (key: 'name' | 'specialization') => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleSelect = (id: number) => {
    const updated = new Set(selectedIds);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedIds(updated);
  };

  const renderDoctorRow = (doc: SanitizedDoctor) => {
    const id = doc.doctor_id && doc.doctor_id !== 0 ? doc.doctor_id : 0;
    const name = `${doc.user?.first_name ?? '—'} ${doc.user?.last_name ?? ''}`;
    const avatar = doc.user?.image_url || `/fallback-avatar-${Math.floor(Math.random() * 3) + 1}.jpeg`;

    return (
      <tr key={id} className="hover:bg-gray-50 transition">
        <td className="px-4 py-3">
          <Checkbox
            checked={selectedIds.has(id)}
            onChange={() => toggleSelect(id)}
          />

        </td>
        <td className="px-4 py-3">
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        </td>
        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{name}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{doc.specialization || '—'}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{doc.available_days || '—'}</td>
        <td className="px-4 py-3 text-sm text-gray-700">
          {doc.available_hours?.length ? doc.available_hours.join(', ') : '—'}
        </td>
        <td className="px-4 py-3 text-sm text-gray-700">
          {doc.payment_per_hour ? `KSh ${doc.payment_per_hour.toLocaleString()}` : '—'}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => onView(doc)} className="text-blue-600 border border-blue-500 hover:bg-blue-500 hover:text-white transition">
              View
            </Button>
            <Button size="sm" onClick={() => onEdit(doc)} className="text-green-600 border border-green-500 hover:bg-green-500 hover:text-white transition">
              Edit
            </Button>
            <Button size="sm" onClick={() => onDelete(id)} className="text-red-600 border border-red-500 hover:bg-red-500 hover:text-white transition" disabled={!id}>
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <Input
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          className="w-full max-w-md"
        />

        {selectedIds.size > 0 && (
          <Button variant="destructive" onClick={() => onBulkDelete?.([...selectedIds])}>
            Delete Selected ({selectedIds.size})
          </Button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200" aria-label="Doctor list">
          <thead className="bg-gradient-to-r from-teal-100 to-blue-100">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('name')}>
                Name {sortKey === 'name' && (sortAsc ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('specialization')}>
                Specialization {sortKey === 'specialization' && (sortAsc ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3">Available Days</th>
              <th className="px-4 py-3">Available Hours</th>
              <th className="px-4 py-3">Payment per Hour</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedDoctors.length > 0 ? (
              paginatedDoctors.map(renderDoctorRow)
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {page + 1} of {Math.ceil(sortedDoctors.length / PAGE_SIZE)}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={(page + 1) * PAGE_SIZE >= sortedDoctors.length}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DoctorTable;
