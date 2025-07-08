import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '' }: { className?: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('savedEmail');
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
