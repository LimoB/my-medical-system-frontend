import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';

interface Props {
  users: User[];
  onRoleChange: (id: number, newRole: User['role']) => void;
  onDelete: (id: number) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const UserTable = ({
  users,
  onRoleChange,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-green-100 to-blue-100">
          <tr>
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
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {user.first_name} {user.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {user.email}
              </td>
              <td className="px-6 py-4">
                <select
                  value={user.role}
                  onChange={(e) =>
                    onRoleChange(user.user_id, e.target.value as User['role'])
                  }
                  className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => onDelete(user.user_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 px-4 py-2 flex justify-end gap-2 border-t bg-gray-50">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={`page-${page}`}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
              }`}
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
