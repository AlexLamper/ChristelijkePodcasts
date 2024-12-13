import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Christelijke Podcasts",
  description: "Ontdek en luister naar christelijke podcasts",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="flex flex-col h-screen lg:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

