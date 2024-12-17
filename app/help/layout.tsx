import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Christelijke Podcasts | Help',
  description: 'Vind antwoorden op veelgestelde vragen over onze podcast ontdekkingsservice.',
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

