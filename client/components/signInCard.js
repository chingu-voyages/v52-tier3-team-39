"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material/";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignInCard() {
  async function handleSubmit(e) {
    //!TODO: eventual code to authenticate login
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 375, p: 2 }}>
      <CardMedia
        sx={{ height: 300 }}
        image="/solar_panels.jpg"
        title="solar_panels"
      />
      <CardContent>
        <Typography
          component="h1"
          sx={{
            width: "100%",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          <span className="text-yellow-500">Sign</span> In
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          color="gray"
          startIcon={<GoogleIcon sx={{ color: "#eab308" }} />}
          //!TODO: Google Auth flow triggers here
          // onClick={() => alert('Sign in with Google')}
        >
          Sign in with Google
        </Button>
      </CardActions>
    </Card>
  );
}
