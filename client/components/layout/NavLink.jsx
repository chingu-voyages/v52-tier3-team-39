import Link from "next/link";
import { Divider, ListItem, Typography } from "@mui/material";

// scroll={false} fixes issue that Next.js has with position: "sticky"
// elements (MUI Backdrop component) and scrolling behavior
// https://github.com/shadcn-ui/ui/issues/1355

export default function NavLink({ link, setOpen, idx }) {
  const { label, href } = link;
  return (
    <>
      {idx ? <Divider /> : null}
      <ListItem sx={{ width: 1, paddingX: 2, marginY: 1 }}>
        <Link
          href={href}
          scroll={false}
          onClick={() => setOpen && setOpen(false)}
        >
          <Typography
            sx={{ fontSize: { xs: 24 }, fontWeight: { xs: 400 } }}
            className="text-darkAccent"
          >
            {label}
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}
