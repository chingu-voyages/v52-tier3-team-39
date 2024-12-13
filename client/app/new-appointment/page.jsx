import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Form from "@/components/form/Form";
import { Box, Stack, Typography } from "@mui/material";

export default async function FormView() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>You must be signed in to make an appointment</p>;
  }
  return (
    <Box
      sx={{
        width: { xs: 1, sm: 4 / 5, md: 3 / 4, lg: 3 / 5 },
        marginY: { xs: 2, lg: 4 },
        marginX: "auto",
      }}
    >
      <Stack direction="column">
        <Stack gap={2}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
          >
            Request Service
          </Typography>
        </Stack>
        <Form email={session.user.email} />
      </Stack>
    </Box>
  );
}
