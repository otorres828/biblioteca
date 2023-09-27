import axios from './../api/axios'
import React, { useEffect, useState } from 'react'
import { StatisticsCard } from "./../widgets/cards";
import {Typography,} from "@material-tailwind/react";
import {
    BanknotesIcon,
    UserIcon,
    UserPlusIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
function Indicadores({fechaInicio,fechaFin,tipoAcceso,headers}) {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [totalUsuariosRegistradosHoy, setTotalUsuariosRegistradosHoy] = useState(0);
    const [totalUsuariosTipo1, setTotalUsuariosTipo1] = useState(0);
    const [totalUsuariosTipo1RegistradosHoy, setTotalUsuariosTipo1RegistradosHoy] = useState(0);
    const [totalPasesValidos, setTotalPasesValidos] = useState(0);
    const [totalPasesValidosHoy, setTotalPasesValidosHoy] = useState(0);
    const [totalPasesInvalidos, setTotalPasesInvalidos] = useState(0);
    const [totalPasesInvalidosHoy, setTotalPasesInvalidosHoy] = useState(0);

    const obtener_estadisticas = () => {
        axios.post("/panel/obtener_estadisticas_entrada", {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          tipo_acceso:tipoAcceso
        }, {
          headers: headers
        })
        
        .then((response) => {
          const data = response.data;
          setTotalUsuarios(data.totalUsuarios);
          setTotalUsuariosRegistradosHoy(data.totalUsuariosRegistradosHoy);
          setTotalUsuariosTipo1(data.totalUsuariosTipo1);
          setTotalUsuariosTipo1RegistradosHoy(data.totalUsuariosTipo1RegistradosHoy);
          setTotalPasesValidos(data.totalPasesValidos);
          setTotalPasesValidosHoy(data.totalPasesValidosHoy);
          setTotalPasesInvalidos(data.totalPasesInvalidos);
          setTotalPasesInvalidosHoy(data.totalPasesInvalidosHoy);
        })
        .catch((error) => {
          console.error('no puede conectarse');
        });
    };

    useEffect(()=>{
        obtener_estadisticas()
    },[fechaInicio, fechaFin,tipoAcceso])

  return (
    <>
        <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
               {/*  TOTAL USUARIOS*/}
               <StatisticsCard
                value={totalUsuariosRegistradosHoy}
                color='blue'
                title={tipoAcceso == "0" ? 'Intentos Accesos' : (tipoAcceso == "1" ? 'Intentos Ingresos' : 'Intentos Salidas')}
                icon={React.createElement(BanknotesIcon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className='text-green-500'>{totalUsuarios}</strong>
                    &nbsp;Total Usuarios
                  </Typography>
                }
              />

                {/*  TOTAL ESTUDIANTES*/}
              <StatisticsCard
                value={totalUsuariosTipo1RegistradosHoy}
                color='pink'
                title={tipoAcceso == "0" ? 'Estudiantes General' : (tipoAcceso == "1" ? 'Estudiantes Ingresados' : 'Estudiantes Salieron')}                 icon={React.createElement(UserIcon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className='text-green-500'>{totalUsuariosTipo1}</strong>
                    &nbsp;Total Estudiantes
                  </Typography>
                }
              />

              {/*  PASES VALIDOS*/}
              <StatisticsCard
                value={totalPasesValidosHoy}
                color='green'
                title={tipoAcceso == "0" ? 'General Válidos' : (tipoAcceso == "1" ? 'Ingresos Válidos' : 'Salidas Válidas')}
                icon={React.createElement(UserPlusIcon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className='text-green-500'>{totalPasesValidos}</strong>
                    &nbsp; Total Pases Validos
                  </Typography>
                }
              />

              {/*  PASES VALIDOS*/}
              <StatisticsCard
                value={totalPasesInvalidosHoy}
                color='red'
                title={tipoAcceso == "0" ? 'General Inválidos' : (tipoAcceso == "1" ? 'Ingresos Inválidos' : 'Salidas Inválidas')}
                icon={React.createElement(ChartBarIcon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className='text-red-500'>{totalPasesInvalidos}</strong>
                    &nbsp;Total Pases Validos
                  </Typography>
                }
              />
        </div>
    </>
    )
}

export default Indicadores