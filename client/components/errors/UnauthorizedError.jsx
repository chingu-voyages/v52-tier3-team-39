import { Alert } from "@mui/material";

export default function UnauthorizedError({ msg }) {
  return (
    <Alert severity="error" sx={{ marginY: 4 }}>
      {msg}
    </Alert>
  );
}
