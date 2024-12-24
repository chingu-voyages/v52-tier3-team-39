"use client";

import { useState, useEffect } from "react";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { IconButton } from "@mui/material";

export default function DarkMode() {
  const darkModePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const darkModeSelected = localStorage.getItem("theme") === "dark";
  const [isDark, setIsDark] = useState(darkModeSelected || darkModePreferred);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const handleClick = () => {
    setIsDark((prev) => !prev);
    isDark
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark");
  };

  return (
    <IconButton onClick={handleClick}>
      {isDark ? (
        <DarkModeTwoToneIcon className="text-darkAccent" />
      ) : (
        <LightModeTwoToneIcon className="text-branding" />
      )}
    </IconButton>
  );
}
