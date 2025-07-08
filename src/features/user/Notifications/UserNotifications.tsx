const UserNotifications = () => {
  const mockNotifications = [
    { id: 1, message: 'Your appointment with Dr. Alice is confirmed.', time: '2 hours ago' },
    { id: 2, message: 'You have a new message from the clinic.', time: 'Yesterday' },
  ];

  return (
    <div className="bg-white shadow p-6 rounded-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {mockNotifications.length === 0 ? (
        <p className="text-gray-500">No notifications.</p>
      ) : (
        <ul className="space-y-3">
          {mockNotifications.map((n) => (
            <li key={n.id} className="border-b pb-2">
              <p className="text-gray-800">{n.message}</p>
              <p className="text-sm text-gray-500">{n.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;
