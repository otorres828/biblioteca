import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import avatar from '../images/avatar.jpg'
import { useSnackbar } from 'notistack';
import axios from './../api/axios'
import TarjetaEstadistica from './TarjetaEstadistica';

function LectorEntradaSA({ingresos,setIngresos,headers}) {

    const { enqueueSnackbar } = useSnackbar();

    const [userData, setUserData] = useState({
      cedula: "C.I. XXXXXX",
      nombre: "XXXXX XXXX, XXX XXX",
      carrera: "XXXXXXX XXXXXXX",
      tipo: "XXXXXXX - XXXXXXX",
      avatar: avatar,
      estatus:'XXXX'
    });
    const [borderColor, setBorderColor] = useState('border border-black');
  
    const obtener_ingresos_hoy = () => {
        axios.get("/ingresaron_salieron_hoy/1", { headers: headers })
        .then((response) => {
            setIngresos(response.data)
        })
        
    }
    
    function ultimo_ingreso(message){
      console.log(message)
      setUserData({
        cedula: `C.I. ${message.Tarjetum ? message.Tarjetum.Usuario.cedula: 'DESCONOCIDO'}`,
        nombre: message.Tarjetum ? message.Tarjetum.Usuario.nombres +', '+ message.Tarjetum.Usuario.apellidos : 'DESCONOCIDO',
        carrera: message.Carrera ? message.Carrera.nombre : 'DESCONOCIDO',
        tipo: message.Tipo ? message.Tipo.nombre.toUpperCase() : '',
        avatar:message.Tarjetum ? (message.Tarjetum.Usuario.avatar ?? avatar) : avatar,
        estatus:message.estatus == 1 ? "PASO" : (message.estatus == 2 ? "NO PASO" : "RECHAZADO")
      });
    }

    useEffect(() => {
      obtener_ingresos_hoy();

      const socket = io(process.env.REACT_APP_API_URL);
      
      socket.on('connect', () => {
          console.log('Socket connected!');
      });
  
      socket.on('mensaje_entrada', (message) => {
        // if(message.estatus!=='denied'){
          setUserData({
            cedula: `C.I. ${message.cedula ?? 'DESCONOCIDO'}`,
            nombre: message.nombre,
            carrera: message.carrera,
            tipo: message.tipo,
            avatar:message.avatar ?? avatar,
            estatus:message.estatus == 1 ? "PASO" : (message.estatus == 2 ? "NO PASO" : "RECHAZADO")
          });
        // }
        switch(message.estatus){
          case "ok":
            // Borde Aprobado
            setBorderColor('border-green-500 border-8');
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
        obtener_ingresos_hoy();
      });

      return () => {
        socket.disconnect();
      };

    }, []);
  
  return (
        <div className="mt-3 w-full lg:w-1/2">
          <div className=" rounded-xl justify-center items-center">
            <div className="md:flex ">
              <div className="w-full md:w-1/2">
                <div className="space-y-2">
                  <p className="text-4xl  text-gray-800 font-serif font-semibold mb-2">Entrada: {ingresos ? ingresos.filter(ingreso => ingreso.estatus == "1").length : 'cargando...'}</p>
                  <hr/>
                  <p className="text-2xl font-bold">{userData.cedula}</p>
                  <p className="text-2xl font-bold">{userData.nombre}</p>
                  <hr/>
                  <p className="text-xl font-bold text-gray-600">{userData.carrera}</p>
                  <p className="text-xl font-bold text-gray-600">{userData.tipo}</p>
                  <hr/>
                  <p className=" text-2xl">Estatus: {userData.estatus}</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="border-2 border-gray-600">
                  <img 
                    src={userData.avatar}
                    alt="Foto del estudiante"
                    className={`h-full w-full object-cover `}
                  />
                </div>
              </div>
            </div>
          </div>


          <div
            className={`mt-5 h-36 w-full overflow-y-scroll p-5 border border-black flex flex-col`}
          >
            {ingresos && ingresos.map((ingreso, index) => (
                <TarjetaEstadistica key={index} acceso={ingreso} ultimo_ingreso_salida={ultimo_ingreso}/>
            ))}

          </div>
        </div>
  )
}

export default LectorEntradaSA;