"use client";
import { Montserrat, Roboto, Orbitron } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const montserrat = Montserrat({
  weight: ["600"],
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
    fontFamily: roboto.style.fontFamily,
    display: {
      fontFamily: orbitron.style.fontFamily,
    },
    sans: {
      fontFamily: montserrat.style.fontFamily,
    },
  },
  palette: {
    branding: "#eab308",
  },
});

export default theme;
