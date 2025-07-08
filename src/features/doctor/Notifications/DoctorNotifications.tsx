const DoctorNotifications = () => {
  // Mocked notifications for now
  const notifications = [
    { id: 1, message: 'New appointment scheduled with Patient A', date: '2025-07-07' },
    { id: 2, message: 'Patient B rescheduled to tomorrow', date: '2025-07-06' },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li key={note.id} className="border p-3 rounded bg-gray-50">
              <p className="text-sm">{note.message}</p>
              <p className="text-xs text-gray-500">{note.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorNotifications;
