import React from "react";

interface ErrorTextProps {
  message: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return (
    <div className="text-red-600 text-xs mt-1 font-semibold">{message}</div>
  );
};

export default ErrorText;
