import {
  HomeIcon,
  TableCellsIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import Historial from "./pages/dashboard/historial";
import Usuarios from "./pages/dashboard/usuarios";
import { Home } from "./pages/dashboard";
import EstadisticaPersonalizada from "./pages/dashboard/EstadisticaPersonalizada";
import Panel from "./pages/dashboard/Panel";
import Visitantes from "./pages/dashboard/Visitantes";
import Estadisticas from "./pages/dashboard/Estadisticas";
import Administradores from "./pages/dashboard/administradores";

const token_biblioteca = localStorage.getItem("token_biblioteca");
const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Panel de Control",
        path: "",
        element: <Panel token_biblioteca={token_biblioteca}/>,
        permission: 0
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Control de Acceso",
        path: "/control-acceso",
        element: <Home token_biblioteca={token_biblioteca}/>,
        permission: 1
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Historial",
        path: "/historial",
        element: <Historial  token_biblioteca={token_biblioteca} />,
        permission: 2
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/usuarios",
        element: <Usuarios token_biblioteca={token_biblioteca}/>,
        permission: 3
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visitantes",
        path: "/visitantes",
        element: <Visitantes token_biblioteca={token_biblioteca}/>,
        permission: 4
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Estadisticas",
        path: "/estadisticas",
        element: <Estadisticas token_biblioteca={token_biblioteca}/>,
        permission: 6
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Estadistica Personalizada",
        path: "/personalizada",
        element: <EstadisticaPersonalizada />,
        permission: 6
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Administradores",
        path: "/administradores",
        element: <Administradores token_biblioteca={token_biblioteca}/>,
        permission: 7
      },
    ],
  },

];

export default routes;
