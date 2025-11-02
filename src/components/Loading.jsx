"use client";

import { CircularProgress, Box } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box className="flex justify-center items-center h-40">
      <CircularProgress />
    </Box>
  );
}