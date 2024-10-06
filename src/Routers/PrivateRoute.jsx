import React, { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  //   Children props
  const { children, requiredRoleID } = props;
  //   auth from auth Context (use context)
  const { roleId, auth } = useContext(AuthContext);

  //   Check auth from user has login or not
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if role id equals with requireRole ID => Render children
  // roleId = 1 => Admin Homepage
  // roleId = 2 => Manager Homepage
  // roleId = 3 => Staff Homepage
  // roleId = 4 => Customer Homepage

  return +roleId === +requiredRoleID ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
