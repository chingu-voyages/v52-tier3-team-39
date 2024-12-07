"use client";
import { Montserrat, Roboto, Orbitron } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

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
    fontFamily: montserrat.style.fontFamily,
    display: {
      fontFamily: orbitron.style.fontFamily,
    },
  },
  palette: {
    branding: "#eab308",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
