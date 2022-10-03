import React, { useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import useIsFirstLoad from "utils/useIsFirstLoad";
import { getUserDetail } from "redux/slices/authSlice";

const AdminTemplate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.scroll(0, 0);
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }

    if (!Boolean(Object.keys(user).length) && token) {
      const id = JSON.parse(localStorage.getItem("_id") || "");
      dispatch(getUserDetail(id));
    }
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header variant="admin" />
      <section>
        <Stack direction="row" flexGrow={1}>
          <Drawer
            anchor="left"
            variant="permanent"
            sx={{
              width: { xs: 200, sm: 300 },
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: { xs: 200, sm: 300 }, boxSizing: "border-box" },
            }}
            PaperProps={{
              sx: (theme) => ({
                height: "100%",
                position: "relative",
              }),
            }}
          >
            <List>
              {["Location", "Room"].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box flexGrow={1}>
            <Outlet />
          </Box>
        </Stack>
      </section>
      <Footer variant="home" />
    </Stack>
  );
};

export default AdminTemplate;
