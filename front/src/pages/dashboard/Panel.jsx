import React, {  useState } from 'react';
import { Typography } from "@material-tailwind/react";
import Indicadores from './../../components/Indicadores';
import FechaInput from './../../components/FechaInput';
import IngresosEdificioGrafico from './../../components/graficos/IngresosEdificioGrafico';
import IngresosTipoUsuarioGrafico  from './../../components/graficos/IngresosTipoUsuarioGrafico';
// import IngresosGraficoComponent from './../../components/graficos/IngresosGraficoComponent';
import IngresosCarreraGrafico from './../../components/graficos/IngresosCarreraGrafico';
import IngresosGraficoCarreraDetallada from './../../components/graficos/IngresosGraficoCarreraDetallada';

function Panel() {
  const [tipoAcceso, setTipoAcceso] = useState(1);

  const [fechaInicio, setFechaInicio] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    const monday = new Date(today.setDate(diff));
    const year = monday.getFullYear();
    const month = String(monday.getMonth() + 1).padStart(2, '0');
    const date = String(monday.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}T00:00`;
  });
  
  const [fechaFin, setFechaFin] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  });
  
  const token_biblioteca = localStorage.getItem("token_biblioteca");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value",
    "Authorization": `Bearer ${token_biblioteca}`
  };

  return (<>
      <div className='md:mx-5 mt-3 mb-28'>
        <FechaInput
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          tipoAcceso={tipoAcceso}
          setFechaInicio={setFechaInicio}
          setFechaFin={setFechaFin}
          setTipoAcceso={setTipoAcceso}
          personalizada={true}
        />
        <Indicadores fechaInicio={fechaInicio} fechaFin={fechaFin} tipoAcceso={tipoAcceso} headers={headers} />

        <Typography className="font-semibold text-3xl text-center text-blue-gray-600">
            Ingresos Generales
        </Typography>
        <div className="mt-12 mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">

          {/* INGRESOS TIPO USUARIO GENERAL - GRAFICO */}
          <IngresosTipoUsuarioGrafico  fechaInicio={fechaInicio} fechaFin={fechaFin}   headers={headers}/>
          
          {/* INGRESOS EDIFICIO - GRAFICO */}
          <IngresosEdificioGrafico  fechaInicio={fechaInicio} fechaFin={fechaFin}      headers={headers}/>
                
          {/* INGRESOS  CARRERA - GRAFICO */}
          <IngresosCarreraGrafico  fechaInicio={fechaInicio} fechaFin={fechaFin}       headers={headers}/>

        </div>
        
        {/* INGRESOS POR TIPO USUARIO DETALLADO - GRAFICO */}
        {/* <Typography className="font-semibold text-3xl text-center text-blue-gray-600">
            Ingresos Detallados por Tipo de Usuario
        </Typography>
        <div className="mt-14 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          <IngresosGraficoComponent  fechaInicio={fechaInicio} fechaFin={fechaFin}   />      
        </div> */}

        {/* INGRESOS POR TIPO CARRERA DETALLADO - GRAFICO */}
        <Typography className="mt-6 font-semibold text-3xl text-center text-blue-gray-600">
            Ingresos Detallados por Tipo de Carrera
        </Typography>
        <div className="mt-14 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          <IngresosGraficoCarreraDetallada  fechaInicio={fechaInicio} fechaFin={fechaFin}  headers={headers} />      
        </div>
      </div>
  </>)

  
}

export default Panel