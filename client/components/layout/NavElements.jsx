import { useState } from "react";
import { Box, Drawer, IconButton, List, Stack } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import NavLink from "./NavLink";

const navLinks = [
  {
    label: "Home",
    href: "/",
    protected: false,
  },
  {
    label: "Request Service",
    href: "/new-appointment",
    protected: false,
  },
  {
    label: "My Appointments",
    href: "/my-appointments",
    protected: false,
  },
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    protected: true,
  },
  {
    label: "Sign Out",
    href: "/api/auth/signout/",
    protected: false,
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton size="medium" onClick={() => setOpen(true)}>
        <MenuRoundedIcon fontSize="inherit" />
      </IconButton>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <Stack direction="row-reverse" className="m-2">
          <IconButton size="large" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
        <Box className="w-[320px] sm:w-[480px]">
          <List>
            {navLinks.map((link) => {
              return <NavLink key={link.label} link={link} setOpen={setOpen} />;
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
      <List className="flex gap-2 lg:gap-8">
        {navLinks.map((link) => {
          return <NavLink key={link.label} link={link} />;
        })}
      </List>
    </Box>
  );
}
