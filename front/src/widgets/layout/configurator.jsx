import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setFixedNavbar,
} from "../../context";
import AccesoManual from "./../../pages/dashboard/acceso-manual";
// import { useSnackbar } from "notistack";
// import { useNavigate } from "react-router-dom";
import axios from './../../api/axios'

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, fixedNavbar } =controller;
  const [permisos,setPermisos] = useState();
  // const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const token_biblioteca= localStorage.getItem('token_biblioteca');

  // function cerrarSesion(){
  //   localStorage.removeItem('token_biblioteca');
  //   enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });
  //   navigate("/login");
  // }

  useEffect(()=>{
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Custom-Header": "Custom-Value",
      "Authorization": `Bearer ${token_biblioteca}`
    };
    axios.get('permisos_administrador',{headers:headers}).
    then((response)=>{
      setPermisos(response.data);
    })
  },[])

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
      {permisos && permisos.find(permiso => permiso.permiso_id == 6) &&
        <div>
          <Typography variant="h5" color="blue-gray">
            Acceso Manual
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            Registra un acceso de forma manual
          </Typography>
        </div>
      }
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      {permisos && permisos.find(permiso => permiso.permiso_id == 6) &&   <AccesoManual />}      
      <div className="py-4 px-6">
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Nabvar Fijo
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>          
          {/* <hr />   
           <li className="text-center">
                <Button
                  className="flex items-center gap-4 px-4 capitalize text-white text-center"
                  fullWidth
                  onClick={cerrarSesion}
                >
                      <Typography
                        className="font-medium capitalize text-center"
                      >
                        Cerrar Sesion
                      </Typography>
              </Button>  
          </li> */}
        </div>    
      </div>
    </aside>
  );
}

export default Configurator;
