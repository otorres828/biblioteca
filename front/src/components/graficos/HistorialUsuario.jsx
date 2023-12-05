import React, { useEffect, useRef, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import PerfilUsuario from './../PerfilUsuario'
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

    function obtener_historial(){
      axios.post("/usuarios/historial_usuario_particular",{cedula,fechaInicio,fechaFin}, {headers: headers})
          .then((response) => {
            setHistorialUsuario(response.data.historial);
            setUsuario(response.data.usuario);
          }).catch((response)=>{
            console.log(response.error)
          });
        if(visitante)
        setHead([
            "fecha",
            "Puerta de",
            "Estatus de Ingreso"
          ]);
    }

    useEffect(()=>{
        obtener_historial();
    },[fechaInicio,fechaFin])

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                ref={dialogRef} // Asignamos la referencia de función al componente Dialog

                >
                <DialogContent>
                    <PerfilUsuario usuario={usuario} 
                    visitante={visitante} 
                    historialUsuario={historialUsuario} 
                    fechaInicio={fechaInicio} 
                    setFechaInicio={setFechaInicio} 
                    fechaFin={fechaFin} 
                    setFechaFin={setFechaFin} 
                    obtener_tipo={obtener_tipo} 
                    obtener_historial={obtener_historial} />
                </DialogContent>

                <DialogActions>           
                    <button className="bg-red-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={handleClose}>Cerrar</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default HistorialUsuario