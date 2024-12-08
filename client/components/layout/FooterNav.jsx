"use client";

import { Stack } from "@mui/material";
import NavLink from "./NavLink";
import { navLinks } from "./Nav";

export default function FooterNav({ session }) {
  const protectedRoutes = navLinks.filter((link) =>
    link.role.includes(session.user.role)
  );
  return (
    <Stack component="ul" sx={{ marginY: 2 }}>
      {protectedRoutes.map((link) => {
        return (
          <NavLink
            key={link.label}
            link={link}
            noscroll
            liStyle={{ paddingX: 0 }}
            textStyle={{
              fontSize: { xs: 20, xl: 22 },
              fontWeight: 400,
            }}
            textColor="text-background"
          />
        );
      })}
    </Stack>
  );
}
