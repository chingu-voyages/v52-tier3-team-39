import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" className="mt-20">
      <Typography variant="h1">RayVolution</Typography>
      <Typography variant="h4">
        So you say you want a <q>rayvolution</q> ... in affordable solar panel
        installation services specific to the Los Angeles area.
      </Typography>
    </Container>
  );
}
