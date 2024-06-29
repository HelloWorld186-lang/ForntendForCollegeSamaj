// Toast.js
import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

const Toast = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) {
    return null;
  }

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center`}>
      <span className="mr-2">{message}</span>
      <button onClick={handleClose} className="ml-2 focus:outline-none text-white rounded-full hover:bg-green-700 p-2">
        <IoCloseSharp />
      </button>
    </div>
  );
};

export default Toast;