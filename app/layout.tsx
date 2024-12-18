import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christelijke Podcasts | Home",
  description: "Ontdek en beluister je favoriete christelijke podcasts, van inspirerende preken en Bijbelstudies tot gesprekken over het christelijk geloof. Luister naar de beste Nederlandse podcasts over het christelijk geloof, kerkmuziek, discipelschap, gebed, evangelieverkondiging en spirituele groei. Blijf op de hoogte van nieuwe afleveringen van populaire religieuze podcasts.",
  keywords: "christelijke nederlandse podcasts, podcasts, nederlands, christelijk, christelijke, christelijk geloof, christelijke podcasts nederlands, nederlandse christelijke podcasts, christelijk podcast, christelijke podcast, christelijke podcasts gratis, nederlands christelijke podcast, christelijke podcast nederlands, favoriete podcasts, christelijk, Nederlandse podcasts, inspiratie, geloof, geloof podcasts, bijbel podcasts, religie podcasts, Nederland podcasts, kerkmuziek, preken, christelijke muziek, god podcasts, discipelschap, gebed podcasts, Nederlandse religie podcasts, Jezus podcasts, evangelie podcasts, bijbelstudie, christelijke audio, inspirerende podcasts, bemoediging, godsdienst, spirituele podcasts, geloofsleven, kerkdiensten, spiritueel onderwijs, prediking, christelijk geloof, bijbel uitleg, christelijke onderwerpen, geloof in actie, podcasts over Jezus, podcasts over God, podcasts voor kerken, Nederlandse preken, christelijke opvoeding, geloof en werk, podcasts over gebed, podcasts over hoop, geloof in Nederland, religieuze lessen, goddelijke wijsheid, christelijke familie, heilige geest podcasts, podcasts over geloofsvragen, podcasts over kerk, Nederland en geloof, podcasts over bijbelstudie, bijbel onderwijs, podcasts over zending, leven met Jezus, podcasts voor gelovigen, christelijke leiderschap, bijbelverhalen, kerk en samenleving, geloofsgroei, podcasts over lofprijs, podcasts over aanbidding, podcasts over discipelschap, podcasts over geestelijke groei, Nederland geloofspodcasts, podcasts over zending, christelijk onderwijs, christelijke preken, podcasts over religieuze muziek, gebedsonderwijs, podcasts over kerkmuziek, podcasts over inspiratie, christelijke levensstijl, podcasts over vreugde, bijbelverzen, podcasts over prediking, podcasts over hoopvolle verhalen, podcasts over kerkdiensten, podcasts over geloven in God, podcasts over bijbel, podcasts over geestelijke lessen, podcasts over discipelen, podcasts over geestelijk leven, podcasts over godsdienst, Nederland en kerken, podcasts voor gelovige families, podcasts over evangelieverkondiging, podcasts over geestelijke oefeningen, podcasts voor spirituele groei, podcasts over christelijk leven, podcasts over kerken in Nederland, podcasts over gelovig leiderschap, podcasts over kerkelijke gemeenschap.",
  openGraph: {
    title: "Christelijke Podcasts | Home",
    description: "Ontdek en beluister je favoriete christelijke podcasts, van inspirerende preken en Bijbelstudies tot gesprekken over het christelijk geloof. Luister naar de beste Nederlandse podcasts over het christelijk geloof, kerkmuziek, discipelschap, gebed, evangelieverkondiging en spirituele groei. Blijf op de hoogte van nieuwe afleveringen van populaire religieuze podcasts.",
    url: "https://christelijkepodcasts.com",
    type: "website",
    images: [{ url: "https://christelijkepodcasts.com/og-image.svg", alt: "Christelijke Podcasts" }],
  },
  alternates: {
    canonical: "https://christelijkepodcasts.site",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
