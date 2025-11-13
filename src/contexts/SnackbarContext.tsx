import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "../components/globalComponents/Snackbar";

interface SnackbarConfig {
  message: string;
  type?: "error" | "success" | "warning" | "info";
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (config: SnackbarConfig | string) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    type: "error" | "success" | "warning" | "info";
    duration: number;
  }>({
    visible: false,
    message: "",
    type: "error",
    duration: 3000,
  });

  const showSnackbar = (config: SnackbarConfig | string) => {
    if (typeof config === "string") {
      setSnackbar({
        visible: true,
        message: config,
        type: "error",
        duration: 3000,
      });
    } else {
      setSnackbar({
        visible: true,
        message: config.message,
        type: config.type || "error",
        duration: config.duration || 3000,
      });
    }
  };

  const showError = (message: string) => {
    showSnackbar({ message, type: "error" });
  };

  const showSuccess = (message: string) => {
    showSnackbar({ message, type: "success" });
  };

  const showWarning = (message: string) => {
    showSnackbar({ message, type: "warning" });
  };

  const showInfo = (message: string) => {
    showSnackbar({ message, type: "info" });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, visible: false }));
  };

  const value: SnackbarContextType = {
    showSnackbar,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
        onDismiss={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}