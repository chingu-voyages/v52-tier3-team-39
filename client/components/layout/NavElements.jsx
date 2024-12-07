import { useState } from "react";
import { Box, Drawer, IconButton, List, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavLink from "./NavLink";

const navLinks = [
  {
    label: "Service",
    href: "/new-appointment",
  },
  {
    label: "Appointments",
    href: "/my-appointments",
  },
  {
    label: "Admin",
    href: "/admin-dashboard",
  },
  {
    label: "Sign Out",
    href: "/api/auth/signout",
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon sx={{ fontSize: 30 }} className="text-darkAccent" />
      </IconButton>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <Stack direction="row-reverse" className="m-2">
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ fontSize: 36 }} className="text-darkAccent" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            width: { xs: 320, sm: 480 },
          }}
        >
          <List>
            {navLinks.map((link, idx) => {
              return (
                <NavLink
                  key={link.label}
                  link={link}
                  setOpen={setOpen}
                  idx={idx}
                />
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export function DesktopNav() {
  return (
    <Box>
      <Stack component="ul" direction="row" gap={2}>
        {navLinks.map((link) => {
          return <NavLink key={link.label} link={link} />;
        })}
      </Stack>
    </Box>
  );
}
