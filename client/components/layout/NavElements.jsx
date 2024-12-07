import { useState } from "react";
import { Box, Drawer, IconButton, List, Stack } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
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
      <IconButton size="medium" onClick={() => setOpen(true)}>
        <MenuRoundedIcon fontSize="inherit" />
      </IconButton>
      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <Stack direction="row-reverse" className="m-2">
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ fontSize: 36 }} className="text-foreground" />
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
      <List className="flex gap-2 lg:gap-8">
        {navLinks.map((link) => {
          return <NavLink key={link.label} link={link} />;
        })}
      </List>
    </Box>
  );
}
