import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, Container } from "@mui/material";
import { StyledRoot } from "./StyledRoot";
import { ClientProvider } from '../context/clientContext';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "RayVolution",
  description: 'A "ray"volution in affordable solar panel installation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <AppRouterCacheProvider>
            <StyledRoot>
            <Box className="min-h-[calc(100vh-80px)] flex flex-col">
              <Header />
              <Container
                component="main"
                maxWidth="lg"
                className="border-x border-gray-200 bg-gray-50 grow py-4"
              >
                {children}
              </Container>
            </Box>
            <Footer />
          </StyledRoot>
          </AppRouterCacheProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
