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
