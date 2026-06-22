import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/lib/queryClient';
import { ToastProvider } from '../shared/components/ui/Toast';
import '../shared/lib/i18n'; // Force i18n initialization

import { connectSocket, disconnectSocket } from '../shared/lib/socket';
import { useAuthStore } from '../features/auth/store';

const SocketManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.accessToken);

  React.useEffect(() => {
    if (token) {
      connectSocket();
    } else {
      disconnectSocket();
    }
    
    return () => {
      // Don't disconnect on unmount, only when token is removed
    };
  }, [token]);

  return <>{children}</>;
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SocketManager>
          {children}
        </SocketManager>
      </ToastProvider>
    </QueryClientProvider>
  );
};
export default Providers;
