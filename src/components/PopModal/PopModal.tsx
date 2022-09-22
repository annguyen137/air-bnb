import { Modal, Box, SxProps } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactElement;
  css?: SxProps;
  icon?: React.ReactElement;
}

const PopModal = ({ open, onClose, children, css, icon }: Props) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={css}>
          <Box sx={{ position: "absolute", right: "15%" }} onClick={onClose}>
            {icon}
          </Box>
          {children}
        </Box>
      </Modal>
    </Box>
  );
};

export default PopModal;
