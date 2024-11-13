"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  {
    label: "Home",
    href: "/",
    protected: false,
  },
  {
    label: "Request Form",
    href: "/form",
    protected: false,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    protected: true,
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <IconButton size="medium" onClick={toggleDrawer(true)}>
        <MenuRoundedIcon fontSize="inherit" />
      </IconButton>
      <Drawer open={open} anchor="left" onClose={toggleDrawer(false)}>
        <Stack direction="row-reverse" sx={{ marginRight: 2 }}>
          <IconButton size="large" onClick={toggleDrawer(false)}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            width: {
              xs: 300,
              sm: 480,
            },
          }}
        >
          <List>
            {navLinks.map(({ label, href }) => {
              return (
                <ListItem key={label}>
                  <Link href={href} onClick={toggleDrawer(false)}>
                    {label}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
