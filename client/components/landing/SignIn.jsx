"use client";

import { Button } from "@mui/material/";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = () => {
    signIn("google");
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      startIcon={<GoogleIcon sx={{ color: "var(--branding)" }} />}
      sx={{
        color: "var(--accent)",
        borderColor: "var(--accent)",
        borderRadius: 2,
      }}
      onClick={handleSubmit}
    >
      Sign in with Google
    </Button>
  );
}
