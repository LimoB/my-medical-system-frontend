import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; // ✅ updated here

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AppRoutes from './routes';
import { setAuthState } from '@/features/slices/authSlice';
import type { DecodedToken } from '@/types/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedToken>(token);
        dispatch(setAuthState({ token, user: decodedUser }));
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  return (
    <div className="w-screen h-screen overflow-x-auto overflow-y-auto font-sans bg-white text-gray-800">
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
