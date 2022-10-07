import { Modal, Box, SxProps } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactElement;
  css?: SxProps;
  icon?: React.ReactElement;
  iconRight?: string;
}

const PopModal = ({ open, onClose, children, css, icon, iconRight }: Props) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1600 }}
      >
        <Box sx={css}>
          <Box
            sx={{ position: "absolute", right: iconRight ?? "15%", top: "5%", cursor: "pointer" }}
            title={"Close"}
            onClick={onClose}
          >
            {icon}
          </Box>
          {children}
        </Box>
      </Modal>
    </Box>
  );
};

export default PopModal;
