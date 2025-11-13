// AlertManager.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AlertBox, { AlertConfig } from '../components/globalComponents/Alertbox';


interface AlertContextType {
  showAlert: (config: AlertConfig) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<(AlertConfig & { visible: boolean }) | null>(null);

  const showAlert = (config: AlertConfig) => {
    setAlert({ ...config, visible: true });
  };

  const handleDismiss = () => {
    setAlert((prev) => (prev ? { ...prev, visible: false } : null));
    setTimeout(() => setAlert(null), 300);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <AlertBox
          visible={alert.visible}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          duration={alert.duration}
          onDismiss={() => {
            handleDismiss();
            if (alert.onDismiss) alert.onDismiss();
          }}
        />
      )}
    </AlertContext.Provider>
  );
};

