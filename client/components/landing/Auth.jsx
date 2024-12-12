import { Stack, Typography } from "@mui/material";
import SignIn from "./SignIn";

export default function () {
  return (
    <Stack gap={4}>
      <Typography>
        <span className="text-branding">Ready to learn more?</span> Please sign
        in with Google account to get started.
      </Typography>
      <SignIn />
    </Stack>
  );
}
