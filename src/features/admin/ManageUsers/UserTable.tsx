import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';

interface Props {
  users: User[];
  onRoleChange: (id: number, newRole: User['role']) => void;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const UserTable = ({
  users,
  onRoleChange,
  onDelete,
  onEdit,
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  return (
    <div className="p-4 md:p-6 bg-white border border-gray-300 shadow-xl rounded-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-[15px] divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-emerald-200 to-sky-200">
            <tr>
              <th className="px-6 py-5 text-left font-semibold text-gray-700 uppercase tracking-wide">Profile</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700 uppercase tracking-wide">Name</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700 uppercase tracking-wide">Email</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700 uppercase tracking-wide">Role</th>
              <th className="px-6 py-5 text-left font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr
                key={user.user_id ?? `${user.email}-${user.first_name}`}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Profile Image */}
                <td className="px-6 py-5 whitespace-nowrap">
                  <img
                    src={user.image_url || '/default-avatar.png'}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                </td>

                {/* Full Name */}
                <td className="px-6 py-5 whitespace-nowrap font-medium text-gray-900">
                  {user.first_name} {user.last_name}
                </td>

                {/* Email */}
                <td className="px-6 py-5 whitespace-nowrap text-gray-700">{user.email}</td>

                {/* Role Dropdown */}
                <td className="px-6 py-5 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.user_id, e.target.value as User['role'])}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    aria-label={`Change role for ${user.first_name}`}
                  >
                    <option value="user">User</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Edit/Delete Actions */}
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => onEdit(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 text-sm rounded-md shadow transition"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onDelete(user.user_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 text-sm rounded-md shadow transition"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-end items-center px-6 py-4 border-t bg-gray-50 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={`page-${page}`}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTable;
