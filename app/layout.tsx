import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Christelijke Podcasts | Home",
  description: "Ontdek en luister naar de beste christelijke podcasts in Nederland. Vind inspirerende, educatieve en religieuze inhoud.",
  keywords: "favoriete podcasts, christelijk, Nederlandse podcasts, inspiratie, geloof, geloof podcasts, bijbel podcasts, religie podcasts, Nederland podcasts, kerkmuziek, preken, christelijke muziek, god podcasts, discipelschap, gebed podcasts, Nederlandse religie podcasts, Jezus podcasts, evangelie podcasts, bijbelstudie, christelijke audio, inspirerende podcasts, bemoediging, godsdienst, spirituele podcasts, geloofsleven, kerkdiensten, spiritueel onderwijs, prediking, christelijk geloof, bijbel uitleg, christelijke onderwerpen, geloof in actie, podcasts over Jezus, podcasts over God, podcasts voor kerken, Nederlandse preken, christelijke opvoeding, geloof en werk, podcasts over gebed, podcasts over hoop, geloof in Nederland, religieuze lessen, goddelijke wijsheid, christelijke familie, heilige geest podcasts, podcasts over geloofsvragen, podcasts over kerk, Nederland en geloof, podcasts over bijbelstudie, bijbel onderwijs, podcasts over zending, leven met Jezus, podcasts voor gelovigen, christelijke leiderschap, bijbelverhalen, kerk en samenleving, geloofsgroei, podcasts over lofprijs, podcasts over aanbidding, podcasts over discipelschap, podcasts over geestelijke groei, Nederland geloofspodcasts, podcasts over zending, christelijk onderwijs, christelijke preken, podcasts over religieuze muziek, gebedsonderwijs, podcasts over kerkmuziek, podcasts over inspiratie, christelijke levensstijl, podcasts over vreugde, bijbelverzen, podcasts over prediking, podcasts over hoopvolle verhalen, podcasts over kerkdiensten, podcasts over geloven in God, podcasts over bijbel, podcasts over geestelijke lessen, podcasts over discipelen, podcasts over geestelijk leven, podcasts over godsdienst, Nederland en kerken, podcasts voor gelovige families, podcasts over evangelieverkondiging, podcasts over geestelijke oefeningen, podcasts voor spirituele groei, podcasts over christelijk leven, podcasts over kerken in Nederland, podcasts over gelovig leiderschap, podcasts over kerkelijke gemeenschap.",
  openGraph: {
    title: "Christelijke Podcasts | Home",
    description: "Ontdek en luister naar de beste christelijke podcasts in Nederland.",
    url: "https://christelijkepodcasts.com",
    type: "website",
    images: [{ url: "https://christelijkepodcasts.com/og-image.jpg", alt: "Christelijke Podcasts" }],
  },
  alternates: {
    canonical: "https://christelijkepodcasts.site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
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
