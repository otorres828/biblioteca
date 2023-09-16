import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import avatar from '../images/avatar.jpg'
import { Typography } from '@material-tailwind/react';
import axios from './../api/axios'
import TarjetaEstadistica from './TarjetaEstadistica';


function LectorSalida({salidas,setSalidas,forzar}) {

    const token_biblioteca = localStorage.getItem("token_biblioteca");

    const [userData, setUserData] = useState({
      cedula: "C.I. XXXXXX",
      nombre: "XXXX, XXXX",
      carrera: "XXXX XXXX",
      tipo: "XXXX",
      avatar: avatar,
    });
    const [borderColor, setBorderColor] = useState('border border-black');
  
    const obtener_salidas_hoy = () => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value",
        "Authorization": `Bearer ${token_biblioteca}`
      };
        axios.get("/ingresaron_salieron_hoy/2", { headers: headers })
        .then((response) => {
            setSalidas(response.data)
        })
    }
     
    function ultima_salida(message){
      console.log(message)
      setUserData({
        cedula: `C.I. ${message.Tarjetum ? message.Tarjetum.Usuario.cedula: 'DESCONOCIDO'}`,
        nombre: message.Tarjetum ? (message.Tarjetum.Usuario.nombres +', '+ message.Tarjetum.Usuario.apellidos) : 'DESCONOCIDO',
        carrera: message.Carrera ? message.Carrera.nombre : 'DESCONOCIDO',
        tipo: message.Tipo ? message.Tipo.nombre : 'DESCONOCIDO',
        avatar:message.Tarjetum ? message.Tarjetum.Usuario.avatar : avatar,
      });
      switch(message.estatus){
        case "1":
          // Borde Aprobado
          setBorderColor('border-green-500 border-8');
          break;
        case "2":
          // Borde No aprobao
          setBorderColor('border-red-500 border-8');
          break;
        case "3":
          // Carnet no existe
          setBorderColor('border-red-600 border-8');
          break; 
        default   :
          setBorderColor('border-gray-600 border-8');
          break;   
      }
    }
    useEffect(() => {
      obtener_salidas_hoy();

      const socket = io(process.env.REACT_APP_API_URL);
      
      socket.on('connect', () => {
          console.log('Socket connected!');
      });
  
      socket.on('mensaje_salida', (message) => {
        // if(message.estatus!=='denied'){
          setUserData({
            cedula: `C.I. ${message.cedula ?? 'DESCONOCIDO'}`,
            nombre: message.nombre,
            carrera: message.carrera,
            tipo: message.tipo,
            avatar:message.avatar ?? avatar,
          });
        // }
        switch(message.estatus){
          case "ok":
            // Borde Aprobado
            setBorderColor('border-blue-500 border-8');
            break;
          case "no_passed":
            // Borde No aprobao
            setBorderColor('border-red-500 border-8');
            break;
          case "denied":
            // Carnet no existe
            setBorderColor('border-red-600 border-8');
            break;  
          default:
            setBorderColor('border-gray-600 border-8');     
        }
        obtener_salidas_hoy();
      });

      return () => {
        socket.disconnect();
      };

    }, [forzar]);
  
  return (
        <div className="w-full lg:w-1/3">
         <div className="flex justify-between items-center">
            <Typography className="text-3xl text-center text-gray-800 font-serif font-semibold mb-2">Salida</Typography>
            <Typography className="text-3xl text-center text-gray-800 font-serif font-semibold mb-2">{salidas ? salidas.filter(salida => salida.estatus == "1").length :'cargando...'}</Typography>
          </div>
          <div
            className={`h-auto bg-gray-200 p-6 ${borderColor}  flex flex-col rounded-xl shadow-lg`}
          >
            {/* <div className=" flex items-center justify-between">
              <div className="h-20 w-full overflow-hidden">
                <img src={logoucab} alt="UCAB logo" className="h-full w-full" />
              </div>
            </div> */}
            <div className="mt-1 flex items-center justify-between">
              <div className="-mt-8">
                <div className="flex flex-col space-y-2 text-left">
                  <p className="text-xl font-bold">{userData.cedula}</p>
                  <p className="text-lg font-bold">{userData.nombre}</p>
                  <p className="text-xl font-bold text-gray-600">
                    {userData.carrera}
                  </p>
                  <p className="text-xl font-bold text-gray-600">
                    {userData.tipo}
                  </p>
                 
                </div>
              </div>
              <div>
                <div className="h-40 w-36 overflow-hidden border-2 border-gray-600">
                  <img
                    src={userData.avatar}
                    alt="Student image"
                    className="h-full w-full"
                  />
                </div>
                <p className="mt-2 text-center text-lg">
                </p>
              </div>
            </div>
          </div>
          <div
            className={`mt-5 h-60 w-full overflow-y-scroll px-5 border border-black flex flex-col pt-6`}
          >
            {salidas && salidas.map((salida, index) => (
              <TarjetaEstadistica key={index} acceso={salida} ultimo_ingreso_salida={ultima_salida} />
            ))}

          </div>
        </div>
  )
}

export default LectorSalida;