import React, { useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from './../api/axios'
import { useSnackbar } from 'notistack';

function AgregarVisitante({ nuevo = null, open, handleClose, usuario = null,obtener_visitantes,headers }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [detalles, setDetalles] = useState("");
  const [correo, setCorreo] = useState("");
  const [cedula_vieja, setCedula_vieja] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleAgregar = () => {
    if (nombres && apellidos && cedula) {
      if (nuevo) {
        agregar_visitante();
      } else {
        actualizar_visitante();
      }
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  const agregar_visitante = () => {
    axios.post('visitantes/crear',{nombres,apellidos,cedula,correo,telefono,detalles},{ headers: headers })
    .then((response)=>{
        if(response.data.exito){
            handleClose();
            obtener_visitantes();
            enqueueSnackbar("Visitante agregado con exito", { variant: "success" });
        }
        else{
            enqueueSnackbar(response.data.error, { variant: "warning" });
        }
    })
  };

  const actualizar_visitante = () => {
    axios.post('visitantes/actualizar',{nombres,apellidos,cedula,cedula_vieja,correo,telefono,detalles},{ headers: headers })
    .then((response)=>{
        if(response.data.exito){
            handleClose();
            obtener_visitantes();
            enqueueSnackbar("Visitante actualizado con exito", { variant: "success" });
        }
        else{
            enqueueSnackbar(response.data.error, { variant: "warning" });
        }
    })
  };

  useEffect(()=>{
    if(usuario){
        setNombres(usuario.nombres)
        setApellidos(usuario.apellidos)
        setCedula(usuario.cedula)
        setCedula_vieja(usuario.cedula)
        setDetalles(usuario.detalles)
        setTelefono(usuario.telefono)
        setCorreo(usuario.correo)
    }else{
        setNombres("")
        setApellidos("")
        setCedula("")
        setDetalles("")
        setCorreo("")
        setTelefono("")
        setCedula_vieja("")
    }
  },[])

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="crear-visitante"
        aria-describedby="crear-visitante"
      >
        <DialogTitle id="crear-visitante">{nuevo ? 'Agregar' : 'Actualizar'} Visitante</DialogTitle>
        <DialogContent>
          <form className="w-full ">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Nombres del Visitante
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Escriba los nombres del visitante"
                  required
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Apellidos del Visitante
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Escriba los apellidos del visitante"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/2 mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Cédula del Visitante
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Escriba la cédula del visitante"
                  required
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/2 mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  correo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  placeholder="Escriba la cédula del visitante"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="w-full  md:w-1/2   mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  detalles
                </label>
                <textarea
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          placeholder="Escriba los nombres del visitante"
                          required
                          defaultValue={detalles}
                          onChange={(e) => setDetalles(e.target.value)}
                        > 
              </textarea>       
              </div>

              <div className="w-full md:w-1/2 mt-4 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Telefono
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  placeholder="Escriba la cédula del visitante"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
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

export default AgregarVisitante;
