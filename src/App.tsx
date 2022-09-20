import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import "./App.css";
import "./scss/style.scss";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import DetailTemplate from "templates/DetailTemplate/DetailTemplate";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import ProtectedRoute from "route/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { manualClearStorage } from "utils/storage";
import { scrollTop } from "utils/eventFunction";

function App() {
  // IF USER TRY TO MANUAL CLEAR LOCALSTORAGE => TRIGGER CLEAR ALL LOCALSTORAGE AND REFRESH PAGE -> REQUIRE RE-LOGIN
  useEffect(() => {
    window.addEventListener("storage", manualClearStorage);
    window.addEventListener("beforeunload", scrollTop);

    return () => {
      window.removeEventListener("storage", manualClearStorage);
      window.removeEventListener("beforeunload", scrollTop);
    };
  }, []);

  // Protected route for Login / Signup: redirect to home if user is logged in
  // Protected route for admin Page: redirect to home if user is not logged in

  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />
        {/* <Route path="login" element={<ProtectedRoute auth={Boolean(token)} component={<Login />} />} /> */}

        <Route path="signup" element={<SignUp />} />
        {/* <Route path="signup" element={<ProtectedRoute auth={Boolean(token)} component={<SignUp />} />} /> */}
      </Route>

      <Route path="rooms/:roomId" element={<DetailTemplate />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
