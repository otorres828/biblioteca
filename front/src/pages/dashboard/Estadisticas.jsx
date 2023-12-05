import React, { useEffect, useState } from 'react';
import axios from './../../api/axios';
import EstadisticaGraficoAgregar from './../../components/graficos/EstadisticaGraficoAgregar';
import EstadisticaGraficoDesagregar from './../../components/graficos/EstadisticaGraficoDesagregar';

function Estadisticas() {
  const [agregar, setAgregar] = useState(1);
  const [tipo_id, setTipo_id] = useState(1);
  const [datos, setDatos] = useState(null);
  const [tiempo, setTiempo] = useState(1);
  const [intervalo, setIntervalo] = useState(1);
  const token_biblioteca = localStorage.getItem("token_biblioteca");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value",
    "Authorization": `Bearer ${token_biblioteca}`
  };

  function cambiar_agregar(){
    if(agregar==1)
      setAgregar(2) //desagregar
    else
      setAgregar(1); //agregar
  }
 
  useEffect(()=>{
      if(agregar==1){ //AGREGAR
        axios.post('estadisticas/usuarios/agregar',{intervalo,tiempo,tipo_id}, {headers: headers})
        .then((response)=>{
          setDatos(response.data)
        })
      }else{ //DESAGREGAR
        axios.post('estadisticas/usuarios/desagregar',{intervalo,tiempo,tipo_id}, {headers: headers})
        .then((response)=>{
          setDatos(response.data)
        })
      }
  },[agregar,tiempo,intervalo,tipo_id])
  
  return (
      <div className='md:mx-2 my-16'>
         {/* <button className="justify-end bg-green-500 hover:bg-green-700 font-semibold rounded-lg p-3 text-white cursor-pointer">Excel</button>
         <button className="justify-end bg-red-500 hover:bg-red-700 font-semibold rounded-lg p-3 text-white cursor-pointer">Pdf</button> */}

        <div className="mt-6 mb-6 grid grid-cols-1  gap-x-6">
          {agregar==1 ? <EstadisticaGraficoAgregar  datos={datos} />: 
          <EstadisticaGraficoDesagregar  datos={datos} />
          }
        </div>

        <div className="flex mx-0 lg:mx-52  mb-8 items-center gap-3">
              <button 
                disabled={tipo_id > 3} 
                onClick={cambiar_agregar} 
                className="w-1/4 justify-end border border-gray-500 bg-gray-500 hover:bg-gray-700 font-semibold rounded-lg p-3 text-white cursor-pointer">
                {agregar == 1 ? 'Desagregar' : 'Agregar'}
              </button>

              <select 
                className="border bg-gray-300 hover:bg-gray-400 border-gray-500 rounded w-1/4 p-4"
                onChange={(e) => setTipo_id(e.target.value)}
              >
                <option value="1">Usuarios</option>
                <option value="2">Estudiante</option>
                <option value="3">Profesor</option>
                {agregar==1 && <>
                <option value="4">Adminstrativo</option>
                <option value="5">Trabajador</option>
                <option value="6">Visitante</option>
                </>
              }
              </select>

              <select            
                className="border bg-gray-300  hover:bg-gray-400  border-gray-500 rounded w-1/4 p-4 ml-5"
                onChange={(e) => setTiempo(e.target.value)}
              >
                <option value="1">Dias</option>
                <option value="2">Semanas</option>
                <option value="3">Meses</option>
                <option value="4">Años</option>
              </select>
              <input
                onChange={(e) => setIntervalo(Math.max(1, e.target.value))}
                type="number"
                min="1"
                aria-disabled
                placeholder="Escriba algo para filtrar..."
                className="w-1/4 appearance-none block bg-gray-200 text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded border-gray-500"
              />

              {/* <select            
                className="border bg-gray-300  hover:bg-gray-400 border-gray-500 rounded lg:w-1/3 p-4"
              >
                <option value="1">Turno</option>
                <option value="2">Mañana</option>
                <option value="3">Tarde</option>
              </select> */}
        </div>
      </div>
  );
}

export default Estadisticas