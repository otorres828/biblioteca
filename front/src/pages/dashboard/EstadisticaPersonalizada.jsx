import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import FechaInput from './../../components/FechaInput';
import IngresosPersonalizado from './../../components/graficos/IngresosPersonalizado';

function EstadisticaPersonalizada() {
  const [tipoAcceso, setTipoAcceso] = useState(1);
  const [tipo_id, setTipo_id] = useState(0);
  const [carrera_id, setCarrera_id] = useState(0);

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
  
  return (
      <div className='md:mx-5 mt-3 mb-28'>
        <FechaInput
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          tipoAcceso={tipoAcceso}
          setFechaInicio={setFechaInicio}
          setFechaFin={setFechaFin}
          setTipoAcceso={setTipoAcceso}
        />

        <div className="flex mb-8 items-center gap-5">
              <Typography className="font-semibold text-xl text-center text-blue-gray-600">
                Seleccione los parametros
              </Typography>

              <select
                onChange={(e) => setCarrera_id(e.target.value)}
                className="border bg-gray-300 hover:bg-gray-400 border-gray-500 p-4 rounded w-1/4"
              >
                <option value="0">Todas las Carreras</option>
                <option value="1">Ingenieria en Informatica</option>
                <option value="2">Ingenieria Industrial</option>
                <option value="3">Ingenieria Civil</option>
                <option value="4">Derecho</option>
                <option value="5">Comunicacion Social</option>
                <option value="6">Administracion de Empresas</option>
                <option value="7">Contaduria Publica</option>
                <option value="8">Relaciones Industriales</option>
              </select>

              <select            
                className="border bg-gray-300 hover:bg-gray-400 border-gray-500 rounded w-1/4 p-4"
                onChange={(e) => setTipo_id(e.target.value)}
              >
                <option value="0">Todos los Tipos</option>
                <option value="1">Estudiante</option>
                <option value="2">Profesor</option>
                <option value="3">Trabajador</option>
                <option value="4">Adminstrativo</option>
                <option value="5">Visitante</option>
              </select>
        </div>

        <div className="mt-12 mb-6 grid grid-cols-1  gap-x-6">
          <IngresosPersonalizado  fechaInicio={fechaInicio} fechaFin={fechaFin} tipo_id={tipo_id} carrera_id={carrera_id}   />
        </div>

      </div>
  );
}

export default EstadisticaPersonalizada