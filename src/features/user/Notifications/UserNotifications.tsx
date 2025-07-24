const UserNotifications = () => {
  const mockNotifications = [
    { id: 1, message: 'Your appointment with Dr. Alice is confirmed.', time: '2 hours ago' },
    { id: 2, message: 'You have a new message from the clinic.', time: 'Yesterday' },
  ];

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">
        Notifications
      </h2>

      {mockNotifications.length === 0 ? (
        <p className="text-center text-gray-500 italic">No notifications.</p>
      ) : (
        <ul className="space-y-4">
          {mockNotifications.map((n) => (
            <li key={n.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
              <p className="text-gray-800 font-medium">{n.message}</p>
              <p className="text-sm text-gray-500 mt-1">{n.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;
