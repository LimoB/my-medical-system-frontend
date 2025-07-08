// src/features/admin/AdminSettings.tsx
import { useState } from "react";

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="w-4 h-4"
            />
            Enable Email Notifications
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Email
          </label>
          <input
            type="email"
            defaultValue="admin@medsystem.com"
            className="w-full border px-3 py-2 rounded-md shadow-sm text-sm"
          />
        </div>

        <button className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
