import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "./../../context/index";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "./../../api/axios";
import { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";

export function Sidenav({ brandName, routes }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [permisos, setPermisos] = useState();
  const icon = {
    className: "w-5 h-5 text-inherit text-white",
  };
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  function cerrarSesion() {
    localStorage.removeItem("token_biblioteca");
    localStorage.removeItem("permisos");
    enqueueSnackbar("Ha cerrado sesion con exito", { variant: "success" });
    navigate("/login");
  }

  useEffect(() => {
    const token_biblioteca = localStorage.getItem("token_biblioteca");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Custom-Header": "Custom-Value",
      Authorization: `Bearer ${token_biblioteca}`,
    };
    axios
      .get("permisos_administrador", { headers: headers })
      .then((response) => {
        setPermisos(response.data);
      });
  }, []);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 px-8 py-6">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "dark"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mb-2 mt-4">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "dark"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
             <li >
                    <NavLink to={`/panel-control`}>
                    {({ isActive }) => (
                        <Button
                          variant={isActive ?"gradient" :'text'}
                          color={'dark'
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <HomeIcon {...icon} />
                          <Typography
                            color="white"
                            className="font-medium capitalize"
                          >
                            Panel de Control
                          </Typography>
                        </Button>
                      )}

                    </NavLink>
                  </li>
            {pages.map(
              ({ icon, name, path }, index) =>
                permisos &&
                permisos.find((permiso) => permiso.permiso_id == index) && (
                  <li key={name}>
                    <NavLink to={`/panel-control${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === "dark"
                              ? "white"
                              : "white"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="white"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                )
            )}
            <hr />
            <li onClick={cerrarSesion} class="">
                <button
                  class="middle w-full items-center gap-4 rounded-lg text-white px-4 py-3 font-sans text-xs font-bold capitalize transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                    <p class="block font-sans text-base font-medium capitalize leading-relaxed text-inherit antialiased">
                      Cerrar Sesión
                    </p>
                </button>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "Sistema de Control de Acceso a Biblioteca",
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
