import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import useIsFirstLoad from "utils/useIsFirstLoad";
import { getUserDetail } from "redux/slices/authSlice";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Loading from "components/Loading/Loading";

const AdminTemplate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();

  const { isFirstLoad, setIsFirstLoad } = useIsFirstLoad();

  const [fakeLoading, setFakeLoading] = useState(true);

  const { user, token, isDetailLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [open, setOpen] = useState<{ [key: string]: boolean }>({
    location: true,
    room: true,
  });

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  useEffect(() => {
    window.scroll(0, 0);
    let timer = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    if (isFirstLoad) {
      setIsFirstLoad(false);
    }

    if (!Boolean(Object.keys(user).length)) {
      const _id = JSON.parse(localStorage.getItem("_id") || "");
      const _token = JSON.parse(localStorage.getItem("token") || "") || token;
      if (_id && _token) {
        dispatch(getUserDetail(_id));
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!Object.keys(user).length) {
    return (
      <Stack sx={{ minHeight: "100vh" }}>
        <Header variant="admin" />
        <section>
          <Box display={"flex"} position="relative" flexGrow={1}>
            <Loading css={{ width: "100%", height: "100%" }} />;
            <CircularProgress
              thickness={6}
              sx={{
                color: "#ff385c",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        </section>
        <Footer variant="home" />
      </Stack>
    );
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header variant="admin" />
      <section>
        <Stack direction="row" flexGrow={1}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Drawer
              variant="permanent"
              sx={{
                [`& .MuiDrawer-paper`]: {
                  position: "unset !important",
                  paddingTop: 3,
                  color: "white",
                },
                ["& .MuiCollapse-root"]: {
                  [`& .MuiListItemButton-root`]: {
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.1) !important",
                    },
                  },
                },
                ["& .MuiListItemIcon-root"]: {
                  color: "#ff385c !important",
                },
              }}
            >
              <Box sx={{ overflow: "auto" }}>
                <List>
                  <ListItemButton
                    key={"location"}
                    onClick={() => handleClick("location")}
                  >
                    <ListItemIcon>
                      <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Location management" />
                    <ListItemIcon>
                      {open.location ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                  </ListItemButton>
                  <Collapse in={open.location} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Location List"
                          onClick={() => navigate("/admin/location-list")}
                        />
                      </ListItemButton>
                      {/*  */}
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AddLocationAltIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Add Location"
                          onClick={() => navigate("/admin/add-location")}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  {/*  */}
                  <Divider />
                  {/*  */}
                  <ListItemButton
                    key={"room"}
                    onClick={() => handleClick("room")}
                  >
                    <ListItemIcon>
                      <LocalHotelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Room management" />
                    <ListItemIcon>
                      {open.room ? <ExpandLess /> : <ExpandMore />}
                    </ListItemIcon>
                  </ListItemButton>
                  <Collapse in={open.room} timeout="auto" unmountOnExit>
                    <List component="div">
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Room List"
                          onClick={() => navigate("/admin/room-list")}
                        />
                      </ListItemButton>
                      {/*  */}
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AddBusinessIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Add Room"
                          onClick={() => navigate("/admin/add-room")}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </Box>
            </Drawer>
            <Box
              padding={{ xs: 1, sm: 2 }}
              sx={{ height: "100%", flexGrow: 1 }}
            >
              {location.pathname === "/admin" ? (
                <Box width={"100%"} height={"100%"}>
                  {fakeLoading || isDetailLoading ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Loading css={{ width: "100%", height: "100%" }} />
                      <CircularProgress
                        thickness={6}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      <h1>All your management items are here!</h1>
                      <h3>Begin by choosing any on the left menu</h3>
                    </Box>
                  )}
                </Box>
              ) : (
                <Outlet />
              )}
            </Box>
          </Box>
        </Stack>
      </section>
      <Footer variant="home" />
    </Stack>
  );
};

export default AdminTemplate;
