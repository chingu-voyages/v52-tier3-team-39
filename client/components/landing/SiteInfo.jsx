import { Divider, Stack, Typography } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

const items = [
  {
    icon: (
      <ConstructionRoundedIcon
        sx={{
          color: "var(--primary)",
          opacity: 4 / 5,
          fontSize: { xs: 20, lg: 32 },
        }}
      />
    ),
    title: "Premium Craftsmanship",
    description: "Experience unmatched durability and a long lasting product.",
  },
  {
    icon: (
      <SavingsRoundedIcon
        sx={{
          color: "var(--primary)",
          opacity: 4 / 5,
          fontSize: { xs: 20, lg: 32 },
        }}
      />
    ),
    title: "Save Energy and Money",
    description:
      "Lower your carbon footprint and electric bill by harnessing the power of the sun!",
  },
  {
    icon: (
      <SolarPowerRoundedIcon
        sx={{
          color: "var(--primary)",
          opacity: 4 / 5,
          fontSize: { xs: 20, lg: 32 },
        }}
      />
    ),
    title: "Have Independence",
    description: "Keep the lights on even when the grid goes dark.",
  },
];

export default function SiteInfo() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: { xs: 24, lg: 48 } }}
      >
        A <span className="text-branding">ray</span>-volution in affordable home
        solar installation!
      </Typography>
      <Stack
        gap={4}
        sx={{
          paddingX: 2,
          paddingY: 4,
          backgroundColor: {
            xs: "var(--background-accent)",
            lg: "transparent",
          },
          border: { xs: "1px solid #eee", lg: "none" },
          borderRadius: 4,
        }}
      >
        {items.map((item, idx) => (
          <>
            <Stack key={item.title} direction="column" gap={1}>
              <Stack direction="row" gap={1} alignItems="center">
                {item.icon}
                <Typography
                  component="h2"
                  sx={{ fontSize: { xs: 16, lg: 28 }, fontWeight: 500 }}
                >
                  {item.title}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "var(--dark-accent)" }}>
                {item.description}
              </Typography>
            </Stack>
            {idx !== items.length - 1 && <Divider />}
          </>
        ))}
      </Stack>
    </Stack>
  );
}
