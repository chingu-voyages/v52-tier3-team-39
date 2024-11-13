"use client";

import { useMediaQuery } from "@mui/material";
import MobileNav from "./NavElements";

export default function Nav() {
  const matches = useMediaQuery("(min-width: 768px)");

  if (!matches) {
    return <MobileNav />;
  }

  return <div>Desktop Nav</div>;
}
