import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDetail } from "redux/slices/authSlice";
import { RootState } from "redux/store";

const ProtectedRoute = ({ component, type }: { component: JSX.Element; type: string }): JSX.Element | any => {
  const location = useLocation();

  const { user, token } = useSelector((state: RootState) => state.auth);

  // CHECK IF USER IS LOGGED IN
  // if (Boolean(localStorage.getItem("_id") && localStorage.getItem("token"))) {
  //   // USER REFRESH PAGE => FETCHING DATA AGAIN THEN RETURN COMPONENT
  //   if (!Boolean(Object.keys(user).length && token)) {
  //     const id = JSON.parse(localStorage.getItem("_id") || "");
  //     dispatch(getUserDetail(id));

  //     return component;
  //   }
  //   // USER EXISTS IN REDUX STORE => RETURN COMPONENT
  //   else if (user.type === type) {
  //     return component;
  //   }
  // }

  // CHECK IF USER IS LOGGED IN
  if (Boolean(localStorage.getItem("_id") && localStorage.getItem("token"))) {
    return component;
  }

  // NOT LOGGED IN BUT TRY TO ACCESS => REDIRECT TO HOME
  toast.error("Sorry, you don't have the right to access that section!", {
    autoClose: 2000,
    pauseOnHover: true,
    closeButton: true,
  });
  return <Navigate to={(location.state as string) ?? "/"} replace={true} />;
};

export default ProtectedRoute;
