"use client"

import { Stack, Typography } from "@mui/material/";
import SignInCard from "@/components/signInCard";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

//left side page content
const items = [
  {
    icon: <ConstructionRoundedIcon sx={{ color: "#1565c0" }} />,
    title: "Premium Quality Craftsmanship",
    description: "Experience unmatched durability and a long lasting product.",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "#1565c0" }} />,
    title: "Save Energy and Money",
    description:
      "Lower your carbon footprint and electric bill by harnessing the power of the sun!",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "#1565c0" }} />,
    title: "Have Independence",
    description: "Keep the lights on even when the grid goes dark.",
  },
];

export default function LandingView() {
  return (
    <div>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
            marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
            minHeight: "100%",
          },
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: { xs: 2, sm: 5 },
          }}
        >
          <Stack
            sx={{
              flexDirection: "column",
              alignSelf: "center",
              gap: 4,
            }}
          >
            <Typography variant="h1">
              <Typography variant="h1" component="span" color={theme => theme.palette.branding} >Ray</Typography>Volution
            </Typography>
            {items.map((item, index) => (
              <Stack key={index} direction="row" sx={{ gap: 1 }}>
                {item.icon}
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

