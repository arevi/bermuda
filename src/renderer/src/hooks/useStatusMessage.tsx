import { useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { StatusMessage } from '../interfaces/Message';

export const useStatusMessages = () => {
  const toastStyle = useMemo(
    () => ({
      background: '#121212',
      borderColor: '#242424',
      color: '#fff',
      marginTop: '2rem',
    }),
    []
  );

  useEffect(() => {
    window.api.on('status', (statusMessage: StatusMessage) => {
      if (statusMessage.type === 'Error') {
        toast.error(statusMessage.message, {
          position: 'top-right',
          style: { ...toastStyle },
        });
      } else {
        toast.success(statusMessage.message, {
          position: 'top-right',
          style: { ...toastStyle },
        });
      }
    });
  }, [toastStyle]);

  return useStatusMessages;
};
