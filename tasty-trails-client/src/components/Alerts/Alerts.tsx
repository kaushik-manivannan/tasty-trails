import React, { useState, useEffect } from 'react';

const AlertBox = ({ type, message }) => {
  const [visible, setVisible] = useState(true);
const onClose = () => {
    setVisible(false);
}
  useEffect(() => {
    // Automatically hide the alert after a certain duration (e.g., 5 seconds)
    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [onClose]);

  const alertStyle = {
    backgroundColor: type === 'success' ? 'green' : 'red',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    zIndex: 9999,
    display: visible ? 'flex' : 'none',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div style={alertStyle}>
      <span>{message}</span>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default AlertBox;
