import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import axios from './../api/axios'
import { useSnackbar } from 'notistack';

function AgregarAdministrador({ nuevo = null, open, handleClose, administrador = null, obtener_administradores, headers }) {
  const [nombre_completo, setNombre_completo] = useState("");
  const [nick, setNick] = useState("");
  const [clave, setClave] = useState("");
  const [permisos, setPermisos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const todosPermisos= [
    {id:1,label:'Control de Acceso'},
    {id:2,label:'Historial'},
    {id:3,label:'Usuarios'},
    {id:4,label:'Visitantes'},
    {id:5,label:'Acceso Manual'},
    {id:6,label:'Estadisticas'},
  ];
  const handleAgregar = () => {
    if (nombre_completo && nick) {
      agregar_visitante();
    } else {
      alert("Por favor, complete el nick y el nombre");
    }
  };

  const agregar_visitante = () => {
    axios.post('administradores/' + (nuevo ? 'crear' : 'actualizar'), { id: (nuevo ? null: administrador.id),nombre_completo, nick,clave, permisos }, { headers: headers })
    .then((response) => {
        if (response.data.mensaje) {
          handleClose();
          obtener_administradores();
          enqueueSnackbar(response.data.mensaje, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.error, { variant: "warning" });
        }
      })
  };

  const handleSwitchChange = (permisoId) => {
    if (permisos.some(obj => obj.id === permisoId)) {
      // El permiso ya está en el array, eliminarlo
      const nuevospermisos = permisos.filter((p) => p.id !== permisoId);
      setPermisos([...nuevospermisos]);
    } else {
      // El permiso no está en el array, agregarlo
      const permiso = todosPermisos.find((p) => p.id === permisoId);
      setPermisos([...permisos, permiso]);
    }
  };
  
  
  useEffect(() => {
    if (administrador && administrador.id) {
      setNick(administrador.nick)
      setNombre_completo(administrador.nombre_completo)
      setPermisos(administrador.permisos)
      setClave('')
    }else{
      setNick("")
      setNombre_completo("")
      setPermisos([])
      setClave('')
    }
  }, [administrador]);

  useEffect(() => {
  }, [permisos]);


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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
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

              <div className="w-full px-3 mt-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2" >
                    Nueva Clave
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="Escriba los nombres del visitante"
                    required
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                />
              </div>
              <div className="w-full mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Permisos
                </label>
                {todosPermisos.map((permiso) => (
                  <FormControlLabel
                    key={permiso.id}
                    control={
                      <Switch
                        checked={permisos.some((p) => p.id === permiso.id)}
                        onChange={() => handleSwitchChange(permiso.id)}
                      />
                    }
                    label={permiso.label}
                  />

                ))}
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