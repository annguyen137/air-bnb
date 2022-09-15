import { Skeleton, Box } from "@mui/material";
import React from "react";

type Props = {
  variant?: string;
  height?: number;
  width?: number;
};

const Loading = ({ variant, height, width }: Props) => {
  return variant === "card" ? (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", aspectRatio: "1/0.9 !important" }}>
        <Skeleton variant="rounded" animation="wave" sx={{ width: "100%", height: "100%" }} />
      </Box>
      <Skeleton height={30} animation="wave" />
      <Box sx={{ display: "flex", gap: "0 20px" }}>
        <Skeleton width={80} animation="wave" />
        <Skeleton width={100} animation="wave" />
      </Box>
      <Skeleton width={50} animation="wave" />
    </Box>
  ) : (
    <Skeleton height={height} width={width} animation="wave" sx={{ transform: "unset" }} />
  );
};

export default Loading;
