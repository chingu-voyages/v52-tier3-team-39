"use client";
import { Roboto, Orbitron } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    content: {
      fontFamily: roboto.style.fontFamily,
    },
  },
  palette: {
    branding: "#eab308",
  },
});

export const headingFont = createTheme({
  typography: {
    fontFamily: orbitron.style.fontFamily,
  },
});

export default theme;
