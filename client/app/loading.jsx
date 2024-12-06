import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop open transitionDuration={0} sx={{ zIndex: 10 }}>
      <CircularProgress sx={{ color: "#eab308" }} />
    </Backdrop>
  );
}
