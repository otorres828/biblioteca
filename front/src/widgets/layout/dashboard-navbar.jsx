import { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "../../context";
import { Tooltip } from "@mui/material";
import axios from './../../api/axios'
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar } = controller;
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter((el) => el !== "");
  const [permisos,setPermisos] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const layout = parts[0];  // obtiene el valor después del primer "/"
  const page = parts[1];    // obtiene el valor después del segundo "/"
  const page2 = parts[2];    // obtiene el valor después del segundo "/"
  
  function cerrarSesion(){
    localStorage.removeItem('token_biblioteca');
    enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });
    navigate("/login");
  }

  useEffect(()=>{
    const token_biblioteca= localStorage.getItem('token_biblioteca');
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
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex  justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize  ml-3 md:ml-8">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Link to={`/${layout}/${page}`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page ? page : ''}
            </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page2 ? page2 : ''}
            </Typography>
          </Breadcrumbs>
         
        </div>
        <div className="flex items-center">
            <Tooltip title="Acceso Manual"  placement="bottom">

              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => setOpenConfigurator(dispatch, true)}
              >
                                <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />

              </IconButton>
            </Tooltip>

            <Menu>
              <MenuHandler>
                <Tooltip title="Menu"  placement="bottom">
                  <IconButton variant="text" color="blue-gray">
              <Bars3Icon strokeWidth={3}  className="h-6 w-6 text-blue-gray-500" />

                  </IconButton>
                </Tooltip>

              </MenuHandler>

              <MenuList className="w-max border-0">
                <NavLink to={`/panel-control`}>
                  <MenuItem className="flex items-center gap-4">
                      Panel de Control
                  </MenuItem>  
                </NavLink>

                {permisos && permisos.find(permiso => permiso.permiso_id == 1) && 
                <NavLink to={`/panel-control/control-acceso/`}>
                  <MenuItem className="flex items-center gap-4">
                      Control de Acceso
                  </MenuItem>
                </NavLink>}

                {permisos && permisos.find(permiso => permiso.permiso_id == 2) &&
                <NavLink to={`/panel-control/estadisticas`}>
                  <MenuItem className="flex items-center gap-4">
                      Estadisticas
                  </MenuItem> 
                </NavLink>}
                
                {permisos && permisos.find(permiso => permiso.permiso_id == 3) &&
                  <NavLink to={`/panel-control/historial`}>
                  <MenuItem className="flex items-center gap-4">
                      Historial
                  </MenuItem> 
                </NavLink>}

                {permisos && permisos.find(permiso => permiso.permiso_id == 4) &&
                  <NavLink to={`/panel-control/usuarios`}>
                  <MenuItem className="flex items-center gap-4">
                      Usuarios
                  </MenuItem>            
                </NavLink>}

                {permisos && permisos.find(permiso => permiso.permiso_id == 5) &&
                  <NavLink to={`/panel-control/visitantes`}>
                  <MenuItem className="flex items-center gap-4">
                      Visitantes
                  </MenuItem>            
                </NavLink>}
                {permisos && permisos.find(permiso => permiso.permiso_id == 7) &&
                  <>
                  <hr/>
                  <NavLink to={`/panel-control/administradores`}>
                  <MenuItem className="flex items-center gap-4">
                      Administradores
                  </MenuItem>            
                </NavLink>
                </>}
                <hr/>
                <MenuItem className="flex items-center gap-4"
                    onClick={cerrarSesion}
                    >
                      Cerrar Sesion
                </MenuItem>            
              </MenuList>
            </Menu>
        </div>
      </div>
    </Navbar>
  );
}

// DashboardNavbar.displayName = "../../widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
