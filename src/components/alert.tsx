import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface CustomAlertProps {
  severity: 'success' | 'error' | 'info';
  message: string;
  visible: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ severity, message, visible }) => {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        zIndex: 9999,
      }}
    >
      {visible && <Alert variant="filled" severity={severity}>{message}</Alert>}
    </Stack>
  );
};

export default CustomAlert;
