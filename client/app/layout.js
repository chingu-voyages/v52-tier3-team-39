import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Container, Stack } from "@mui/material";
import { StyledRoot } from "./StyledRoot";
import Header from "@/components/layout/Header";
import Splash from "@/components/landing/Splash";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "RayVolution",
  description: 'A "ray"volution in affordable solar panel installation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StyledRoot>
            <Stack className="min-h-[calc(100vh-var(--footer-height))]">
              <Header />
              <Splash />
              <Container
                component="main"
                maxWidth="xl"
                sx={{ paddingY: 2, flexGrow: 1 }}
              >
                {children}
              </Container>
            </Stack>
            <Footer />
          </StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
