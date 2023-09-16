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

const token_biblioteca = localStorage.getItem("token_biblioteca");
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Panel de Control",
        path: "/",
        element: <Panel token_biblioteca={token_biblioteca}/>,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [

      {
        icon: <BellIcon {...icon} />,
        name: "Control de Acceso",
        path: "/control-acceso",
        element: <Home token_biblioteca={token_biblioteca}/>,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Estadisticas",
        path: "/estadisticas",
        element: <Estadisticas token_biblioteca={token_biblioteca}/>,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Estadisticas Personalizada",
        path: "/personalizada",
        element: <EstadisticaPersonalizada />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Historial",
        path: "/historial",
        element: <Historial  token_biblioteca={token_biblioteca} />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/usuarios",
        element: <Usuarios token_biblioteca={token_biblioteca}/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Visitantes",
        path: "/visitantes",
        element: <Visitantes token_biblioteca={token_biblioteca}/>,
      },
    ],
  },

];

export default routes;
