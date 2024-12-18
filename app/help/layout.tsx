import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Christelijke Podcasts | Help',
  description: 'Vind antwoorden op veelgestelde vragen over onze podcast ontdekkingsservice.',
  keywords: "favoriete podcasts, christelijk, Nederlandse podcasts, inspiratie, geloof, geloof podcasts, bijbel podcasts, religie podcasts, Nederland podcasts, kerkmuziek, preken, christelijke muziek, god podcasts, discipelschap, gebed podcasts, Nederlandse religie podcasts, Jezus podcasts, evangelie podcasts, bijbelstudie, christelijke audio, inspirerende podcasts, bemoediging, godsdienst, spirituele podcasts, geloofsleven, kerkdiensten, spiritueel onderwijs, prediking, christelijk geloof, bijbel uitleg, christelijke onderwerpen, geloof in actie, podcasts over Jezus, podcasts over God, podcasts voor kerken, Nederlandse preken, christelijke opvoeding, geloof en werk, podcasts over gebed, podcasts over hoop, geloof in Nederland, religieuze lessen, goddelijke wijsheid, christelijke familie, heilige geest podcasts, podcasts over geloofsvragen, podcasts over kerk, Nederland en geloof, podcasts over bijbelstudie, bijbel onderwijs, podcasts over zending, leven met Jezus, podcasts voor gelovigen, christelijke leiderschap, bijbelverhalen, kerk en samenleving, geloofsgroei, podcasts over lofprijs, podcasts over aanbidding, podcasts over discipelschap, podcasts over geestelijke groei, Nederland geloofspodcasts, podcasts over zending, christelijk onderwijs, christelijke preken, podcasts over religieuze muziek, gebedsonderwijs, podcasts over kerkmuziek, podcasts over inspiratie, christelijke levensstijl, podcasts over vreugde, bijbelverzen, podcasts over prediking, podcasts over hoopvolle verhalen, podcasts over kerkdiensten, podcasts over geloven in God, podcasts over bijbel, podcasts over geestelijke lessen, podcasts over discipelen, podcasts over geestelijk leven, podcasts over godsdienst, Nederland en kerken, podcasts voor gelovige families, podcasts over evangelieverkondiging, podcasts over geestelijke oefeningen, podcasts voor spirituele groei, podcasts over christelijk leven, podcasts over kerken in Nederland, podcasts over gelovig leiderschap, podcasts over kerkelijke gemeenschap.",
  alternates: { canonical: "https://christelijkepodcasts.com/help" },
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}

