import { Alert, AlertColor } from '@mui/material';

interface NotificationProps {
  message: string;
  type: AlertColor;
}

const Notification = ({ message, type }: NotificationProps) => {
  return (
    <>
      <Alert severity={type}>{message}</Alert>
    </>
  );
};

export default Notification;
