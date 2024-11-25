import { ListItem, Typography } from "@mui/material";

export default function ({ label, value }) {
  return (
    <ListItem disablePadding>
      <Typography sx={{ fontSize: { xs: "0.9rem", lg: "1rem" } }}>
        {label ? `${label}:` : ""} {value}
      </Typography>
    </ListItem>
  );
}
