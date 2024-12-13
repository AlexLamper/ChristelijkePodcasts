import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { AppSidebar } from "@/components/AppSidebar"
import Header from "@/components/Header"
import { SidebarProvider } from "@/components/ui/sidebar"

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
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <Header />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
