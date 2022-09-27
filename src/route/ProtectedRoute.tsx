import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserDetail } from "redux/slices/authSlice";
import { AppDispatch, RootState } from "redux/store";

const ProtectedRoute = ({ component }: { component: JSX.Element }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  // // CHECK IF USER IS LOGGED IN
  // if (Boolean(localStorage.getItem("_id") && localStorage.getItem("token"))) {
  //   // USER REFRESH PAGE => FETCHING DATA AGAIN THEN RETURN COMPONENT
  //   if (!Boolean(Object.keys(user).length && token)) {
  //     const id = JSON.parse(localStorage.getItem("_id") || "");
  //     dispatch(getUserDetail(id));
  //     return component;
  //   }
  //   // USER EXISTS IN REDUX STORE => RETURN COMPONENT
  //   else {
  //     return component;
  //   }
  // }
  // CHECK IF USER IS LOGGED IN
  if (Boolean(localStorage.getItem("_id") && localStorage.getItem("token"))) {
    return component;
  }

  // NOT LOGGED IN BUT TRY TO ACCESS => REDIRECT TO HOME
  return <Navigate to={"/"} replace={true} />;
};

export default ProtectedRoute;
