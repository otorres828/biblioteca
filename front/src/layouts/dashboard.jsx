import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { DashboardNavbar, Configurator, Footer } from "./../widgets/layout";
import routes from "./../routes";
import Sidenav from "../widgets/layout/sidenav";
import { useMaterialTailwindController, setOpenConfigurator } from "./../context/index";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const location = useLocation();
  const permisos = JSON.parse(localStorage.getItem('permisos'));
  const filteredRoutes = routes.filter(({  pages }) =>
    pages.some(({ path, permission }) =>
      '/panel-control'+path === location.pathname && permisos.includes(permission)
    )
  );
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
       
      />
      <div className="p-4  xl:ml-72">
        <DashboardNavbar />
        <Configurator />
        
        <Routes>
          {filteredRoutes.map(
            ({ pages }) =>
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
