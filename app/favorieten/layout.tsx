import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Christelijke Podcasts | Favorieten',
  description: 'Bekijk en beluister je favoriete christelijke podcasts.',
}

export default function FavorietenLayout({
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

