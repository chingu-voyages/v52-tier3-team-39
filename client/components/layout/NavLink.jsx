import Link from "next/link";
import { ListItem } from "@mui/material";

export default function NavLink({ link, setOpen }) {
  const { label, href } = link;
  return (
    <ListItem sx={{ width: "fit-content" }}>
      <Link href={href} onClick={() => setOpen && setOpen(false)}>
        {label}
      </Link>
    </ListItem>
  );
}
