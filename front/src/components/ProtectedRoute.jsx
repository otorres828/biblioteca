import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RedirectPanel = ({  children,redirectTo = "/panel-control",}) => {
  const token = localStorage.getItem("token_biblioteca");

  if ( token) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export const RedirectLogin = ({ children, redirectTo = "/login",}) => {
  
  const token = localStorage.getItem("token_biblioteca");
  if (!token) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

export const ProtectedPermiso = ({  children,redirectTo = "/panel-control",}) => {
  const permisos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return children ? children : <Outlet />;
};
