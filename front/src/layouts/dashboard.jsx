import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { DashboardNavbar, Configurator, Footer } from "./../widgets/layout";
import routes from "./../routes";

export function Dashboard() {
  const location = useLocation();
  const permisos = JSON.parse(localStorage.getItem('permisos'));
  const filteredRoutes = routes.filter(({  pages }) =>
    pages.some(({ path, permission }) =>
      '/panel-control'+path === location.pathname && permisos.includes(permission)
    )
  );
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-4">
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
