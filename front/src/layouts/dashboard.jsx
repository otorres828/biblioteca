import { Routes, Route } from "react-router-dom";
import {
  DashboardNavbar,
  Configurator,
  Footer,
} from "./../widgets/layout";
import routes from "./../routes";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
    
      <div className="p-4">
        <DashboardNavbar />
        <Configurator />
        
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout == "dashboard" &&
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

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
