import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { StatusMessage } from '../interfaces/Message';

export const useStatusMessages = () => {
  useEffect(() => {
    window.api.on('status', (statusMessage: StatusMessage) => {
      if (statusMessage.type === 'Error') {
        toast.error(statusMessage.message, {
          position: 'top-right',
          style: { background: '#333', color: '#fff', marginTop: '2rem' },
        });
      } else {
        toast.success(statusMessage.message, {
          position: 'top-right',
          style: { background: '#333', color: '#fff', marginTop: '2rem' },
        });
      }
    });
  }, []);

  return useStatusMessages;
};
