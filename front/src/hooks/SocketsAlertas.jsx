import { useEffect} from 'react';
import { io } from 'socket.io-client';
import { useSnackbar } from 'notistack';

const SocketsAlertas = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    socket.on('connect', () => {
      console.log('Socket connected!');
    });

    socket.on('mensaje_entrada', (message) => {
      switch (message.estatus) {
        case 'ok':
          enqueueSnackbar('El usuario ha sido autenticado', { variant: 'success' });
          break;
        case 'no_passed':
          enqueueSnackbar('El usuario no tiene permisos para pasar', { variant: 'error' });
          break;
        case 'denied':
          enqueueSnackbar('No tiene permisos para pasar', { variant: 'warning' });
          break;
      }
    });

    socket.on('mensaje_salida', (message) => {
      switch (message.estatus) {
        case 'ok':
          enqueueSnackbar('El usuario ha sido autenticado', { variant: 'success', vertical: 'bottom',horizontal: 'right'});
          break;
        case 'no_passed':
          enqueueSnackbar('El usuario no tiene permisos para pasar', { variant: 'error', vertical: 'bottom',horizontal: 'right' });
          break;
        case 'denied':
          enqueueSnackbar('No tiene permisos para pasar', { variant: 'warning', vertical: 'bottom',horizontal: 'right' });
          break;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default SocketsAlertas;
