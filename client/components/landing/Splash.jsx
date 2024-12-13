"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import panels from "../../public/static/panels.webp";

export default function Splash() {
  const path = usePathname();
  if (path === "/signIn" || path === "/") {
    return (
      <Box
        sx={{
          width: 1,
          position: "relative",
          aspectRatio: 2 / 1,
          overflow: "hidden",
        }}
      >
        <Image
          src={panels}
          alt="Solar panels"
          style={{
            objectFit: "cover",
          }}
          fill
          priority
        />
      </Box>
    );
  }

  return null;
}
