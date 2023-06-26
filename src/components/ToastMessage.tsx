import { Alert, AlertProps, Snackbar } from '@mui/material';
import { useState, forwardRef, useImperativeHandle } from 'react';

interface ToastMessageProps {
  duration?: number;
}

export interface ToastMessageRef {
  success: (message: string) => void;
  error: (message: string) => void;
}

export const ToastMessage = forwardRef<ToastMessageRef, ToastMessageProps>(({ duration = 3000 }, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertProps['severity']>('success');

  useImperativeHandle(ref, () => ({
    success: (message) => {
      setMessage(message);
      setSeverity('success');
      setOpen(true);
    },

    error: () => {
      setMessage(message);
      setSeverity('error');
      setOpen(true);
    },
  }));

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} ref={ref} open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
});
