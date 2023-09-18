import { useEffect} from 'react';
import { io } from 'socket.io-client';
import { useSnackbar } from 'notistack';

const SocketsAlertas = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    socket.on('connect', () => {
    });

    socket.on('mensaje_entrada', (message) => {
      switch (message.estatus) {
        case 'ok':
          enqueueSnackbar(message.nombre+' ha ingresado', { variant: 'success' });
          break;
        case 'no_passed':
          enqueueSnackbar('El usuario ya se encuentra dentro de la biblioteca', { variant: 'warning' });
          break;
        case 'denied':
          enqueueSnackbar(message.error, { variant: 'error' });
          break;
      }
    });

    socket.on('mensaje_salida', (message) => {
      switch (message.estatus) {
        case 'ok':
          enqueueSnackbar(message.nombre+' ha sido salido', { variant: 'success'});
          break;
        case 'no_passed':
          enqueueSnackbar('El usuario no esta dentro de la biblioteca', { variant: 'warning' });
          break;
        case 'denied':
          enqueueSnackbar(message.error, { variant: 'error' });
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
