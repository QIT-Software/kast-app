import React from 'react';

interface ErrorPlaceholderFillProps {
  message: string;
  details?: string;
  refresh?: () => void;
}

const ErrorPlaceholder: React.FC<ErrorPlaceholderFillProps> = ({message}) => {
  return <div>Error {message}</div>;
};

export default ErrorPlaceholder;
