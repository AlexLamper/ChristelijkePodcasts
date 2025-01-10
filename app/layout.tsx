import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Christelijke Podcasts | Home",
  description:
    "Ontdek en beluister je favoriete christelijke podcasts, van inspirerende preken en Bijbelstudies tot gesprekken over het christelijk geloof. Luister naar de beste Nederlandse podcasts over het christelijk geloof, kerkmuziek, discipelschap, gebed, evangelieverkondiging en spirituele groei. Blijf op de hoogte van nieuwe afleveringen van populaire religieuze podcasts.",
  keywords: "christelijke nederlandse podcasts, podcasts, nederlands, geloof, bijbelstudie, inspiratie",
  openGraph: {
    title: "Christelijke Podcasts | Home",
    description:
      "Ontdek en beluister je favoriete christelijke podcasts, van inspirerende preken en Bijbelstudies tot gesprekken over het christelijk geloof.",
    url: "https://christelijkepodcasts.com",
    type: "website",
    images: [
      { url: "https://christelijkepodcasts.com/og-image.svg", alt: "Christelijke Podcasts" },
    ],
  },
  alternates: {
    canonical: "https://christelijkepodcasts.site",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          forcedTheme={undefined}
        >
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

