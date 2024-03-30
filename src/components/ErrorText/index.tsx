import React from "react";
import { ErrorTextProps } from "@/types/index.types";

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return (
    <div className="text-red-600 text-xs mt-1 font-semibold">{message}</div>
  );
};

export default ErrorText;
