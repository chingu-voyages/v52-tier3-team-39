import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider, ListItem, Typography } from "@mui/material";

// scroll={false} fixes issue that Next.js has with position: "sticky"
// elements (MUI Backdrop component) and scrolling behavior
// https://github.com/shadcn-ui/ui/issues/1355

export default function NavLink({ link, setOpen, idx }) {
  const { label, href } = link;
  const pathname = usePathname();
  const activeLink = pathname === href;
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
              paddingX: 0.5,
            }}
            className={`${
              activeLink ? "text-branding" : "text-darkAccent"
            } lg:hover:bg-branding lg:hover:text-background lg:hover:opacity-70`}
          >
            {label}
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}
