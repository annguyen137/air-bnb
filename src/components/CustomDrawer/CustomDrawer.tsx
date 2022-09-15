import React from "react";
import { Box, Drawer, Button } from "@mui/material";
import { SxProps } from "@mui/system";

type DrawerProps = {
  anchor: "bottom" | "left" | "right" | "top";
  children?: React.ReactElement;
  css?: SxProps;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  icon?: React.ReactElement;
};

const CustomDrawer = ({ anchor, children, css, toggle, isOpen, icon }: DrawerProps) => {
  return (
    <Box>
      <Drawer anchor={anchor} open={isOpen} onClose={toggle} PaperProps={{ sx: css }}>
        <Box sx={{ height: "100%" }}>
          <Box
            sx={{
              position: "sticky",
              zIndex: 10,
              top: 0,
              width: "100%",
              padding: "0 20px",
              backgroundColor: "white",
            }}
          >
            <Button onClick={toggle}>{icon}</Button>
          </Box>
          <Box sx={{ padding: "50px", height: "100%" }}>{children}</Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
