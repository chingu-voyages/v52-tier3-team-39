"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
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

  function validateInputs() {
    //!TODO: code to validate inputs here at some point
  }

  return (
    <Card variant="outlined" sx={{ minWidth: 375, p: 2 }}>
      <CardContent>
        <Typography
          component="h1"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            textAlign: "center",
          }}
        >
          <span className="text-yellow-500">Sign</span> In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              // error={emailError}
              // helperText={emailErrorMessage}
              id="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              // error={passwordError}
              // helperText={passwordErrorMessage}
              id="password"
              placeholder="••••••"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </CardContent>
      <Divider>or</Divider>
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
