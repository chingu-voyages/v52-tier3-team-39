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
      <ListItem
        sx={{
          width: { xs: 1, lg: "fit-content" },
          paddingX: { xs: 2, sm: 4, md: 6, lg: 0 },
          marginY: 1,
        }}
      >
        <Link
          href={href}
          scroll={false}
          onClick={() => setOpen && setOpen(false)}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, lg: 20, xl: 22 },
              fontWeight: { xs: 400, lg: 500 },
            }}
            className="text-darkAccent"
          >
            {label}
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}
