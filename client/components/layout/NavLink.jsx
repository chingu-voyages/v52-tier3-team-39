import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider, ListItem, Typography } from "@mui/material";

// scroll={false} fixes issue that Next.js has with position: "sticky"
// elements (MUI Backdrop component) and scrolling behavior
// https://github.com/shadcn-ui/ui/issues/1355

export default function NavLink({
  link,
  setOpen,
  idx,
  noscroll,
  liStyle,
  textStyle,
  textColor,
  hover,
}) {
  const { label, href } = link;
  const pathname = usePathname();
  const activeLink = pathname === href;
  return (
    <>
      {idx ? <Divider /> : null}
      <ListItem
        sx={
          liStyle || {
            width: { xs: 1, lg: "fit-content" },
            paddingX: { xs: 2, sm: 4, md: 6, lg: 0 },
            marginY: 1,
          }
        }
      >
        <Link
          href={href}
          scroll={!!noscroll}
          onClick={() => setOpen && setOpen(false)}
        >
          <Typography
            sx={
              textStyle || {
                fontSize: { xs: 24, lg: 20, xl: 22 },
                fontWeight: { xs: 400, lg: 500 },
                paddingX: 0.5,
              }
            }
            className={`${activeLink ? "text-branding" : "text-darkAccent"} ${
              hover &&
              "hover:bg-branding hover:text-background hover:opacity-70"
            } ${textColor || "text-darkAccent"}`}
          >
            {label}
          </Typography>
        </Link>
      </ListItem>
    </>
  );
}
