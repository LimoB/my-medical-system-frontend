import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, Slide } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

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
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastClassName={() =>
          'bg-white text-gray-800 shadow-md rounded-lg px-4 py-3 border border-gray-200'
        }
      />

    </div>
  );
}

export default App;
