import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AlertComponentProps, AlertsContainerProps } from "@/types/index.types";

const AlertComponent: React.FC<AlertComponentProps> = ({
  message,
  severity,
  id,
  removeAlert,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => removeAlert(id), 3000);
    return () => clearTimeout(timer);
  }, [id, removeAlert]);

  return (
    <CSSTransition key={id} timeout={300} classNames="item">
      <Alert severity={severity} className="mb-2">
        {message}
      </Alert>
    </CSSTransition>
  );
};

export const AlertsContainer: React.FC<AlertsContainerProps> = ({
  alerts,
  removeAlert,
}) => (
  <TransitionGroup>
    {alerts.map((alert) => (
      <AlertComponent key={alert.id} {...alert} removeAlert={removeAlert} />
    ))}
  </TransitionGroup>
);
