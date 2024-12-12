"use client";

import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material/";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

export default function SignInCard() {
  const handleSubmit = () => {
    signIn("google");
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/static/solar_panels.jpg"
        title="solar_panels"
      />
      <CardContent>
        <Typography
          component="h1"
          sx={{
            width: "100%",
            fontSize: "2rem",
            textAlign: "center",
            color: (theme) => theme.palette.branding,
          }}
        >
          Sign In
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          color="gray"
          startIcon={
            <GoogleIcon sx={{ color: (theme) => theme.palette.branding }} />
          }
          onClick={handleSubmit}
        >
          Sign in with Google
        </Button>
      </CardActions>
    </Card>
  );
}
