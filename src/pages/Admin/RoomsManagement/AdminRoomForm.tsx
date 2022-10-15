import { Box } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

const AdminRoomForm = (props: Props) => {
  return (
    <Box>
      <h1>{props.title}</h1>
    </Box>
  );
};

export default AdminRoomForm;
