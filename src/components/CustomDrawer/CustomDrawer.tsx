import React, { RefObject } from "react";
import { Box, Drawer, Button } from "@mui/material";
import { SxProps } from "@mui/system";

type DrawerProps = {
  anchor: "bottom" | "left" | "right" | "top";
  children?: React.ReactElement;
  css?: SxProps;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  icon?: React.ReactElement;
  customCss?: SxProps;
};

const CustomDrawer = ({ anchor, children, css, toggle, isOpen, icon, customCss }: DrawerProps) => {
  return (
    <Drawer anchor={anchor} open={isOpen} onClose={toggle} PaperProps={{ sx: css }} sx={customCss}>
      <Box
        sx={{
          height: "100%",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {icon && (
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
        )}
        <Box
          sx={(theme) => ({
            height: "100%",
            overflowY: "hidden",
            overflowX: "hidden",
            [theme.breakpoints.down("sm")]: {
              padding: "10px",
            },
            [theme.breakpoints.up("sm")]: {
              padding: "20px",
            },
          })}
        >
          {children}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
