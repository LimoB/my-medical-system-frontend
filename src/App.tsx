import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes';  // Import AppRoutes that contains all your route definitions

import './App.css';

function App() {
  return (
    <>
      {/* All routes are handled through AppRoutes */}
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
    </>
  );
}

export default App;
