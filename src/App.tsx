import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <div className="w-screen h-screen overflow-x-auto overflow-y-auto font-sans bg-white text-gray-800">
      {/* All routes */}
      <AppRoutes />

      {/* Toast notifications container */}
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

console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);



export default App;
