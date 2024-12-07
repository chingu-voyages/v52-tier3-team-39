"use client";

import { useMediaQuery } from "@mui/material";
import { MobileNav, DesktopNav } from "./NavElements";

export default function Nav() {
  const matches = useMediaQuery("(min-width: 1024px)");

  if (!matches) {
    return <MobileNav />;
  }

  return <DesktopNav />;
}
