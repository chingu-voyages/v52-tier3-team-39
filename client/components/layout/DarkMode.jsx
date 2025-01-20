"use client";

import { useState, useEffect } from "react";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { IconButton } from "@mui/material";

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // check for dark theme in local storage
    if (localStorage.getItem("theme")) {
      setIsDark(localStorage.getItem("theme") === "dark");
    } else {
      // check for system dark preference, use if no theme in storage
      const darkModePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(darkModePreferred);
    }

  }, []);

  useEffect(() => {
    // add/remove "dark" class in <html> element
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

    localStorage.setItem("theme", isDark ? "light" : "dark");

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
