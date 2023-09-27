import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";

const ProtectedPermisos = ({ component: Component, permission, ...rest }) => {
  const isAuthenticated = checkUserPermissions(); // Implement your own function to check user permissions
  const permisos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  function checkUserPermissions(){
    return false
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && permission.includes(props.location.pathname) ? (
          <Component {...props} />
        ) : (
             <Navigate to={'login'} />
            )
      }
    />
  );
};

export default ProtectedPermisos;
