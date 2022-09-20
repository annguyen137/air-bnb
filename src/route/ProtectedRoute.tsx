import { User } from "interfaces/user";
import React, { Children } from "react";
import { Navigate, NavigateFunction } from "react-router-dom";
import { JsxElement } from "typescript";

interface protectedRouteProps {
  auth: boolean;
  component: JSX.Element;
}

const ProtectedRoute = ({ auth, component }: protectedRouteProps) => {
  if (auth) {
    return <Navigate to={"/"} replace={true} />;
  }
  return component;
};

export default ProtectedRoute;
