import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Christelijke Podcasts | Contact',
  description: 'Neem contact op met ons voor vragen, opmerkingen of suggesties.',
}

export default function ContactLayout({
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

