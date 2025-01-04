"use client";

import { useState, useEffect } from "react";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { IconButton } from "@mui/material";

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModePreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkModeSelected = localStorage.getItem("theme") === "dark";
    setIsDark(darkModeSelected || darkModePreferred);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleClick = () => {
    setIsDark((prev) => !prev);
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
