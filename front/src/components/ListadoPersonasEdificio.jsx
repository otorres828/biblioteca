import React, { useRef, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from '@material-tailwind/react';

function ListadoPersonasEdificio({open,personas,handleClose}) {
    const [buscar, setBuscar] = useState("");
    const dialogRef = useRef(null); // Referencia de función

    const tipo = (tipo_id) => {
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

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                ref={dialogRef} // Asignamos la referencia de función al componente Dialog

                >
                <DialogTitle id="alert-dialog-title">
                    <div className="text-2xl text-teal-900 font-bold text-center">
                    Personas dentro del edificio
                    </div>
                </DialogTitle>

                <DialogContent>
                    {/* FILTRO SEARCH */}
                    <div className='flex justify-start items-center mb-4'>
                        <Typography >
                            Buscar usuario
                        </Typography>
                        <input
                            type="search"
                            placeholder="Escriba nombre,apellido,cedula..."
                            onChange={(e) => setBuscar(e.target.value)}
                            className="ml-3 appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded col-span-2 border-blue-100"
                        />
                    </div>
                    <hr/>
                    {/* TABLE */}
                    <div className="overflow-x-scroll">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                {["Hora","Nombres y Apellidos","Cedula", "Tipo de Usuario","Carrera"].map((el) => (
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
                                {personas &&
                                    personas.filter(({ nombres, apellidos, cedula }) => {
                                        const nombre_y_apellido = nombres + ' ' + apellidos;
                                        const apellido_y_nombre = apellidos + ' ' + nombres;
                                        return (
                                            (typeof nombre_y_apellido === 'string' ? nombre_y_apellido.toLowerCase() : '').includes(typeof buscar === 'string' ? buscar.toLowerCase() : '') ||
                                            (typeof apellido_y_nombre === 'string' ? apellido_y_nombre.toLowerCase() : '').includes(typeof buscar === 'string' ? buscar.toLowerCase() : '') ||
                                            cedula.toString().includes(buscar)
                                        );
                                    })
                                    .map(
                                    ({ nombres,apellidos,cedula,tipo_id,carrera,hora_ingreso}, key) => {
                                        const className = `py-3 px-5 ${
                                        key == personas.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                        }`;

                                        return (
                                        <tr key={cedula} className="hover:bg-blue-gray-50">
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {hora_ingreso}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {nombres+', '+apellidos}
                                                    </Typography>
                                                    
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {cedula}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">          
                                                {tipo(tipo_id).toUpperCase()}                       
                                            </Typography>
                                            </td> 
                                            <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">          
                                                {carrera.toUpperCase()}                       
                                            </Typography>
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
                <button className="bg-red-500 font-semibold rounded-lg p-3 text-white cursor-pointer mr-3" onClick={handleClose}>Cerrar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ListadoPersonasEdificio