import { Skeleton, Box } from "@mui/material";
import React from "react";

type Props = {
  variant?: string;
  height?: number;
  width?: number;
};

const Loading = ({ variant, height, width }: Props) => {
  return variant === "card" ? (
    <Box sx={{ width: "100%", aspectRatio: "1/1" }}>
      <Skeleton variant="rounded" height={250} animation="wave" />
      <Skeleton height={30} animation="wave" />
      <Box sx={{ display: "flex", gap: "0 20px" }}>
        <Skeleton width={80} animation="wave" />
        <Skeleton width={100} animation="wave" />
      </Box>
      <Skeleton width={50} animation="wave" />
    </Box>
  ) : (
    <Box>
      <Skeleton height={height} width={width} animation="wave" />
    </Box>
  );
};

export default Loading;
