import React from 'react';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';

function FechaInput({ fechaInicio, fechaFin, setFechaInicio, setFechaFin, tipoAcceso=null, setTipoAcceso=null,personalizada=null,boton=null,excel=null,historialUsuario=null,usuario=null}) {
  function subtractHours(date, hours) {
    date.setHours(date.getHours() - hours);
    return date;
  }
  return (
    <div className="grid grid-cols-12 mb-8 gap-3">
      {/* TIPO DE ACCESO */}
      {personalizada &&
        <select 
          className="border p-2 rounded col-span-6 md:col-span-2 border-blue-100"
          value={tipoAcceso}
          onChange={(e) => setTipoAcceso(e.target.value)}
        >
          <option value="0">Todas las Acciones</option>
          <option value="1">Ingresos</option>
          <option value="2">Salidas</option>
        </select>
      }
      {personalizada ?
        <Link to='personalizada' className={`text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-6 md:col-span-2`}>
          <button>
              Personalizar Estadistica
          </button>
        </Link>
        :
        !boton && <Link to='../' className={`text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  col-span-6 md:col-span-2 `}>
          <button >
              Regresar al Panel de Control
          </button>
        </Link>
        
      }
   
      <div className='col-span-8 flex mt-1 md:mt-0 gap-1'>
        {/* FECHA DE INICIO */}
        <input style={{width:"90%"}}
          className={`justify-end md:mr-2 col-span-6 md:col-span-${!boton ? '3':'3'} rounded border border-blue-100 p-3 md:p-3`}
          type="datetime-local"
          value={fechaInicio && fechaInicio.slice(0, 16)}
          onChange={(e) => {
            let selectedDate = new Date(e.target.value);
            selectedDate = subtractHours(selectedDate, 4);
            const formattedDate = selectedDate.toISOString().slice(0, 16);
            setFechaInicio(formattedDate);
          }}
        />

        {/* FECHA DE FIN */}
        <input style={{width:"100%"}}
          className={` col-span-6 md:col-span-${!boton ? '3':'3'} rounded border border-blue-100 p-3 md:p-3`}
          type="datetime-local"
          value={fechaFin && fechaFin.slice(0, 16)}
          onChange={(e) => {
            let selectedDate = new Date(e.target.value);
            selectedDate = subtractHours(selectedDate, 4);
            const formattedDate = selectedDate.toISOString().slice(0, 16);
            setFechaFin(formattedDate);
          }}
        />

        {/* EXCEL */}
        {excel && historialUsuario.length>0 &&
                        <ReactHTMLTableToExcel
                            className=" shadow-lg bg-green-300  rounded-lg p-3 mr-3"
                            table="historial"
                            filename={`Historial de ${usuario.cedula}`}
                            filetype="xls"
                            sheet={`Cedula: ${usuario.cedula}`}
                            buttonText="Excel"/>
                    } 
      </div>
    </div>
  );
}

export default FechaInput;
