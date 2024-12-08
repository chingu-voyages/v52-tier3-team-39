"use client";

import { useState } from "react";
import { Box, Drawer, IconButton, List, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavLink from "./NavLink";

export const navLinks = [
  {
    label: "Home",
    href: "/",
    role: ["user", "admin"],
    mobile: true,
  },
  {
    label: "Service",
    href: "/new-appointment",
    role: ["user", "admin"],
  },
  {
    label: "Appointments",
    href: "/my-appointments",
    role: ["user", "admin"],
  },
  {
    label: "Admin",
    href: "/admin-dashboard",
    role: ["admin"],
  },
  {
    label: "Sign Out",
    href: "/api/auth/signout",
    role: ["user", "admin"],
  },
];

export default function Nav({ session }) {
  const [open, setOpen] = useState(false);

  const protectedRoutes = navLinks.filter((link) =>
    link.role.includes(session.user.role)
  );

  return (
    <>
      {/* MOBILE NAV */}
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ fontSize: 30 }} className="text-darkAccent" />
        </IconButton>
        <Drawer
          open={open}
          anchor="left"
          onClose={() => setOpen(false)}
          sx={{ display: { lg: "none" } }}
        >
          <Stack direction="row-reverse" className="m-2">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ fontSize: 36 }} className="text-darkAccent" />
            </IconButton>
          </Stack>
          <Box
            sx={{
              width: { xs: 320, sm: 432, md: 690 },
            }}
          >
            <List>
              {protectedRoutes.map((link, idx) => {
                return (
                  <NavLink
                    key={link.label}
                    link={link}
                    setOpen={setOpen}
                    idx={idx}
                    textColor="text-darkAccent"
                  />
                );
              })}
            </List>
          </Box>
        </Drawer>
      </Box>
      {/* DESKTOP NAV */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Stack component="ul" direction="row" gap={{ lg: 3, xl: 6 }}>
          {protectedRoutes
            .filter((link) => !link.mobile)
            .map((link) => {
              return <NavLink key={link.label} link={link} hover />;
            })}
        </Stack>
      </Box>
    </>
  );
}
