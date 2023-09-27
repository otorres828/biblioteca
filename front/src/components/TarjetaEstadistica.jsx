import React from 'react'
import { Typography } from '@material-tailwind/react';

function TarjetaEstadistica({acceso,ultimo_ingreso_salida}) {

  function formatoFecha(fecha) {
    const date = new Date(fecha);
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const ampm = hora >= 12 ? 'pm' : 'am';
    const horaFormateada = hora % 12 || 12;
    
    const fechaFormateada = `${horaFormateada}:${minutos} ${ampm}`;    
    return `${fechaFormateada}`;
  }

    return (
        <>
            {acceso && 
            <div className="hover:bg-gray-400 flex justify-between cursor-pointer" onClick={()=>{ultimo_ingreso_salida(acceso)}}>
                <div className="flex flex-1 ">
                    <Typography className={`text-lg font-semibold ${acceso.estatus !== '1' ? 'text-red-500' : ''}`}>
                        {formatoFecha(acceso.fecha)} -
                    </Typography>

                    <Typography className={`ml-1 text-lg font-semibold ${acceso.estatus !== '1' ? 'text-red-500' : ''}`}>
                        {acceso.Tarjetum && acceso.Tarjetum.Usuario ? acceso.Tarjetum.Usuario.nombres + ' ' + acceso.Tarjetum.Usuario.apellidos : 'DESCONOCIDO'}
                    </Typography>
                </div>

                <Typography className={`text-lg font-semibold ${acceso.estatus !== '1' ? 'text-red-500' : ''}`}>
                    {acceso.Tipo && acceso.Tipo ? acceso.Tipo.nombre.substring(0, 3) : ''}
                </Typography> 
            </div>
            }
        </>
    )
}

export default TarjetaEstadistica
