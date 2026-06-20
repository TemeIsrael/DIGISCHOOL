import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import { useAuthStore } from './features/auth/store';

// Expose the auth store for testing/debugging purposes
if (typeof window !== 'undefined') {
  (window as any).__STORE__ = useAuthStore;
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



