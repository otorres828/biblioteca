import React, { useEffect, useRef, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from '@material-tailwind/react';
import {
    Chip,
  } from "@material-tailwind/react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel-3';

import FechaInput from '../FechaInput';
import axios from './../../api/axios'

function HistorialUsuario({visitante=null,open,cedula,handleClose,headers}) {
    const [historialUsuario, setHistorialUsuario] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [head, setHead] = useState([]);
    const dialogRef = useRef(null); // Referencia de función

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

    const obtener_tipo = (tipo_id) => {
        let tipoTexto;
      
        switch (tipo_id) {
          case 1:
            tipoTexto = 'Estudiante';
            break;
          case 2:
            tipoTexto = 'Profesor';
            break;
          case 3:
            tipoTexto = 'Administrativo';
            break;
          case 4:
            tipoTexto = 'Empleado';
            break;
          case 5:
            tipoTexto = 'Visitante';
            break;
          default:
            tipoTexto = '';
        }
      
        return tipoTexto;
    };

    function formatoFecha(fecha) {
        const fechaObj = new Date(fecha);
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones).replace('/', '-').replace('/', '-');
        const horaFormateada = fechaObj.toLocaleTimeString('es-ES', { hour12: true });
        return `${fechaFormateada} - ${horaFormateada}`;
    }
    
    useEffect(()=>{
        axios.post("/historial_usuario_particular/",{cedula,fechaInicio,fechaFin}, {headers: headers})
          .then((response) => {
            setHistorialUsuario(response.data.historial);
            setUsuario(response.data.usuario);
          });
        if(visitante)
        setHead([
            "fecha",
            "Puerta de",
            "Estatus de Ingreso"
          ]);
    },[fechaInicio,fechaFin])

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={visitante ? 'sm' :'md'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                ref={dialogRef} // Asignamos la referencia de función al componente Dialog

                >
                <DialogTitle id="alert-dialog-title">
                    <div className="text-2xl text-teal-900 font-bold text-center">
                    Historial del {visitante ? 'Visitante' : 'Usuario'}: {usuario ? usuario.nombres+', '+usuario.apellidos : '...cargando...'}
                    </div>
                </DialogTitle>

                <DialogContent>
                    {/* FILTRO SEARCH */}
                    <div className='flex justify-start items-center -mb-5'>
                        <FechaInput
                            fechaInicio={fechaInicio}
                            fechaFin={fechaFin}
                            setFechaInicio={setFechaInicio}
                            setFechaFin={setFechaFin}
                            boton={true}
                        />
                        <Typography className="flex justify-end mb-8">
                            {historialUsuario.length} Accesos 
                        </Typography>
                    </div>
                    <hr/>
                    {/* TABLE */}
                    <div className="overflow-x-scroll">
                        <table className="w-full min-w-[640px] table-auto" id="historial">
                            <thead>
                            <tr>
                                {visitante ? ["fecha", "Puerta de", "Estatus de Ingreso"].map((el) => (
                                    <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                    </th>
                                ))
                                : ["fecha", "Ingreso Como", "Carrera", "Puerta de", "Estatus de Ingreso"]
                                .map((el) => (
                                    <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                    </th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {historialUsuario &&
                                    historialUsuario.map(
                                    ({ fecha,Carrera,tipo,tipo_id,estatus}, key) => {
                                        const className = `py-3 px-5 ${
                                        key == historialUsuario.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                        return (
                                        <tr key={`${fecha}-${key}`}  className="hover:bg-blue-gray-50">
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-semibold"
                                                >
                                                    {formatoFecha(fecha)}
                                                </Typography> 
                                            </td>
                                            {!visitante && (
                                                <>
                                                    <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {obtener_tipo(tipo_id).toUpperCase()}
                                                    </Typography>
                                                    </td>

                                                    <td className={className}>
                                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                                        {Carrera ? Carrera.nombre : 'VISITANTE'}
                                                    </Typography>
                                                    </td>
                                                </>
                                                )}

                                            
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={tipo == 1 ? "blue" : "yellow"}
                                                    value={tipo == 1 ? "Entrada" : "Salida"}
                                                    className="py-0.5 px-2 text-[12px] font-medium"
                                                />
                                            </td>

                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={estatus == 1 ? "green" : "red"}
                                                    value={estatus == 1 ? "PASO" : estatus == 2 ? "NO PASO" : estatus == 3 ? "RECHAZADO" : ""}
                                                    className="py-0.5 px-2 text-[12px] font-medium"
                                                />
                                            </td>                               
                                        </tr>
                                        );
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>

                <DialogActions>
                    {historialUsuario.length>0 &&
                        <ReactHTMLTableToExcel
                            className=" shadow-lg bg-green-300  rounded-lg p-3 mr-3"
                            table="historial"
                            filename={`Historial de ${usuario.cedula}`}
                            filetype="xls"
                            sheet={`Cedula: ${usuario.cedula}`}
                            buttonText="Excel"/>
                    }            
                    <button className="bg-red-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={handleClose}>Cerrar</button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default HistorialUsuario