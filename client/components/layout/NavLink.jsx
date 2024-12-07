import Link from "next/link";
import { ListItem, Typography } from "@mui/material";

// scroll={false} fixes issue that Next.js has with position: "sticky"
// elements (MUI Backdrop component) and scrolling behavior
// https://github.com/shadcn-ui/ui/issues/1355

export default function NavLink({ link, setOpen }) {
  const { label, href } = link;
  return (
    <ListItem sx={{ width: "fit-content" }}>
      <Link
        href={href}
        scroll={false}
        onClick={() => setOpen && setOpen(false)}
      >
        <Typography variant="sans">{label}</Typography>
      </Link>
    </ListItem>
  );
}
