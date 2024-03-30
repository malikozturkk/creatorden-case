import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  AlertsContainer,
  BaseAlertProps,
  AlertProps,
} from "../components/CustomAlert";

interface AlertContextType {
  addAlert: (alert: BaseAlertProps) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within a AlertProvider");
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  const addAlert = useCallback(
    ({ message, severity }: Omit<AlertProps, "id">) => {
      const id = Date.now();
      const newAlert: AlertProps = { id, message, severity };
      setAlerts((prev) => [...prev, newAlert]);
    },
    []
  );

  const removeAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      <AlertsContainer alerts={alerts} removeAlert={removeAlert} />
      {children}
    </AlertContext.Provider>
  );
};
