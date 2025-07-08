// File: src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import '@/index.css';
import 'react-tooltip/dist/react-tooltip.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store'; //import store and persistor
import { AuthProvider } from '@/contexts/AuthContext'; //Keep existing auth context

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Redux store provider */}
      <PersistGate loading={null} persistor={persistor}> {/*Redux Persist gate */}
        <BrowserRouter>
          <AuthProvider> {/*Still wrapping in your AuthContext */}
            <App />
          </AuthProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
