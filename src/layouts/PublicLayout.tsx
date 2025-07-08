
import { Outlet } from 'react-router-dom';
import Header from '../landing/Header';

const PublicLayout = () => {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
