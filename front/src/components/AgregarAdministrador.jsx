import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from './../api/axios'
import { useSnackbar } from 'notistack';

function AgregarAdministrador({ nuevo = null, open, handleClose, administrador = null,obtener_administradores,headers }) {
  const [nombre_completo, setNombre_completo] = useState("");
  const [nick, setNick] = useState("");
  const [permisos, setPermisos] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const handleAgregar = () => {
    if (nombre_completo && nick) {
        agregar_visitante();
    } else {
      alert("Por favor, complete el nick y el nombre");
    }
  };

  const agregar_visitante = () => {
    axios.post('visitantes/crear',{nombre_completo,nick,permisos},{ headers: headers })
    .then((response)=>{
        if(response.data.exito){
            handleClose();
            obtener_administradores();
            enqueueSnackbar("Visitante agregado con exito", { variant: "success" });
        }
        else{
            enqueueSnackbar(response.data.error, { variant: "warning" });
        }
    })
  };

  useEffect(()=>{
    if(administrador.id){
      setNick(administrador.nick)
      setNombre_completo(administrador.nombre_completo)
      setPermisos(administrador.permisos)
    }
  },[])

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="crear-visitante"
        aria-describedby="crear-visitante"
      >
        <DialogTitle id="crear-visitante">{nuevo ? 'Agregar' : 'Actualizar'} Administrador</DialogTitle>
        <DialogContent>
          <form className="w-full ">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Nombre
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Escriba los nombres del visitante"
                  required
                  value={nombre_completo}
                  onChange={(e) => setNombre_completo(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Nick
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Escriba los apellidos del visitante"
                  required
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                />
              </div>
              <div className="w-full mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-cedula">
                  Permisos
                </label>
               
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <button className="bg-blue-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={handleAgregar}>{nuevo ? 'Agregar' : 'Actualizar'}</button>
          <button className="bg-red-500 font-semibold rounded-lg p-3 text-white cursor-pointer" onClick={handleClose}>Cancelar</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AgregarAdministrador;
