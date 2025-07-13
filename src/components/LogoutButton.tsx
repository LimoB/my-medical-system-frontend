import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '' }: { className?: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all possible user-related data
    localStorage.removeItem('token');
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Optionally: clear entire storage if you're sure nothing else is needed
    // localStorage.clear();
    // sessionStorage.clear();

    navigate('/login');
  };

  return (
    <div
      onClick={handleLogout}
      className={`cursor-pointer text-sm text-left px-4 py-2 hover:bg-gray-100 transition ${className}`}
    >
      Logout
    </div>
  );
};

export default LogoutButton;
