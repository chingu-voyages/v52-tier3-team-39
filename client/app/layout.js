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
  // apply dark mode preference while hydrating in SSR (avoids FOUC)
  // use try block to prevent crash if local storage can't be accessed
  const themeScript = `
        (function() {
          try {
            const storedTheme = localStorage.getItem('theme');
            const darkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (storedTheme === 'dark' || (!storedTheme && darkModePreferred)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}
        })();
      `;
  return (
    // use suppressHydrationWarning because dark mode class is controlled by inline script
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppRouterCacheProvider>
          <StyledRoot>
            <Stack sx={{ minHeight: "calc(100vh - var(--footer-height))" }}>
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
