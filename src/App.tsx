import React, { useEffect } from "react";
import "./App.css";
import "./scss/style.scss";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import DetailTemplate from "templates/DetailTemplate/DetailTemplate";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import ProtectedRoute from "route/ProtectedRoute";
import { scrollTop } from "utils/eventFunction";
import Profile from "pages/Profile/Profile";
import RoomListByLocationTemplate from "templates/DetailTemplate/RoomListByLocationTemplate";
import AdminTemplate from "templates/AdminTemplate/AdminTemplate";
import LocationManagement from "pages/Admin/LocationsManagement/LocationManagement";
import RoomManagement from "pages/Admin/RoomsManagement/RoomManagement";
import AdminLocationForm from "pages/Admin/LocationsManagement/AdminLocationForm";
import AdminRoomForm from "pages/Admin/RoomsManagement/AdminRoomForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "redux/slices/authSlice";
import { AppDispatch, RootState } from "redux/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // const { user } = useSelector((state: RootState) => state.auth);

  // useEffect(() => {
  //   if (!Boolean(Object.keys(user).length)) {
  //     const id = JSON.parse(localStorage.getItem("_id") || "");
  //     const token = JSON.parse(localStorage.getItem("token") || "");
  //     if (id && token) {
  //       console.log("run");
  //       dispatch(getUserDetail(id));
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    window.addEventListener("beforeunload", scrollTop);

    return () => {
      window.removeEventListener("beforeunload", scrollTop);
    };
  }, []);

  // Protected route for Login / Signup: redirect to home if user is logged in
  // Protected route for admin Page: redirect to home if user is not logged in

  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="/rooms/:roomId" element={<DetailTemplate />} />

      <Route path="/location" element={<RoomListByLocationTemplate />} />

      <Route path="/profile" element={<ProtectedRoute type={"CLIENT" || "ADMIN"} component={<Profile />} />} />

      <Route path="/admin" element={<ProtectedRoute type={"CLIENT" || "ADMIN"} component={<AdminTemplate />} />}>
        <Route path="location-list" element={<LocationManagement />} />
        <Route path="add-location" element={<AdminLocationForm />} />
        <Route path="edit-location/:locationId" element={<AdminLocationForm />} />

        <Route path="room-list" element={<RoomManagement />} />
        <Route path="add-room" element={<AdminRoomForm />} />
        <Route path="edit-room/:roomId" element={<AdminRoomForm />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
