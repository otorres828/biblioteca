import axios from './../../api/axios'
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import Select from 'react-select';

const AccesoManual = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const token_biblioteca = localStorage.getItem("token_biblioteca");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Custom-Header": "Custom-Value",
    "Authorization": `Bearer ${token_biblioteca}`
  };
 
  const tipo = [
    { value: "1", label: "Ingreso" },
    { value: "2", label: "Salida " },
  ];

  const manejarCambioUsuario = selectedOption => setUsuarioSeleccionado(selectedOption);
  const manejarCambioTipo = selectedOption => setTipoSeleccionado(selectedOption);

  function otorgarAcceso()  {
    if(!tipoSeleccionado ){
      enqueueSnackbar("Debe seleccionar un tipo", { variant: "warning" });
      return;
    }
    if(!usuarioSeleccionado ){
      enqueueSnackbar("Debe seleccionar un usuario", { variant: "warning" });
      return;
    }
    var tipo_acceso = tipoSeleccionado.value ==1 ? "entrada" : "salida";
    axios.get("/control-acceso/"+tipo_acceso+"/"+usuarioSeleccionado.value+"/"+usuarioSeleccionado.tipo, {headers: headers})
    .then(function(response) {
      if(response.data.error)
        enqueueSnackbar(response.data.error, { variant: "warning" });
    })
    .catch(error => {
        console.error("Error al intentar valiar la tarjeta:", error);
    });  
  }

  function obtener_usuarios(){
    axios
    .get("/todos_usuarios", {headers: headers,})
    .then((response) => {
      setUsuarios(response.data);
    });
  }

  useEffect(()=>{
    obtener_usuarios();
  },[])

  return (
    
    <div className="w-full items-center mb-3">
      <label className="font-bold">Seleccione el acceso</label>
      <Select
        className="w-full"
        value={tipoSeleccionado}
        options={tipo}
        onChange={option => manejarCambioTipo(option)}
      />

      {usuarios && <div className="my-3">
        <label className="font-bold">Seleccione el usuario</label>
        <Select
          className="w-full"
          value={usuarioSeleccionado}
          options={usuarios}
          onChange={option => manejarCambioUsuario(option)}
        />
      </div>}
      <button 
        type="submit" 
        onClick={otorgarAcceso} 
        className="w-full p-2 bg-blue-500 text-white rounded "
      >
        Dar Acceso
      </button>
    </div>

  );
};

export default AccesoManual;
