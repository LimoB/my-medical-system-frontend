import { Outlet } from 'react-router-dom';
import Header from '../landing/Header';

const PublicLayout = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Header will be visible across all public pages */}
      <Header />

      {/* Main content area */}
      <main className="min-h-screen">
        {/* This is where the matched child route (HomePage, ServicePage, etc.) will be rendered */}
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
