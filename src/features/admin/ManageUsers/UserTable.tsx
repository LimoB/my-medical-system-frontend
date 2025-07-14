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
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-teal-100 to-blue-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Profile
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user.user_id ?? `${user.email}-${user.first_name}`}
              className="hover:bg-gray-50 transition"
            >
              {/* 👤 Profile */}
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={user.image_url || '/default-avatar.png'}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-avatar.png';
                  }}
                />
              </td>

              {/* 🧑 Name */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                {user.first_name} {user.last_name}
              </td>

              {/* 📧 Email */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {user.email}
              </td>

              {/* 🔄 Role */}
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user.user_id, e.target.value as User['role'])}
                  className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  aria-label={`Change role for ${user.first_name}`}
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              {/* 🛠️ Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => onEdit(user)}
                    className="text-yellow-600 border border-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 px-3 py-1 text-sm rounded-md transition"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDelete(user.user_id)}
                    className="text-red-600 border border-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-3 py-1 text-sm rounded-md transition"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-end items-center px-6 py-4 border-t bg-gray-50 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={`page-${page}`}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-green-500 to-sky-500 text-white shadow-md'
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
