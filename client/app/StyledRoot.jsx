"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export function StyledRoot({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
