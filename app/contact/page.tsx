import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="p-6 md:p-12 mx-auto max-w-full">
      {/* Full-width header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact</h1>
        <div className="mb-2 space-y-2">
          <ModeToggle />
          <SidebarTrigger className="lg:hidden" />
        </div>
      </div>

      <div className="lg:hidden">
        <Separator />
      </div>

      {/* Content with max width of 3xl */}
      <div className="max-w-3xl mx-auto">
        <p className="mb-6 text-gray-900 dark:text-gray-300 lg:mt-0 mt-6">
          Heeft u vragen, opmerkingen of suggesties? We staan voor u klaar! Hieronder vindt u verschillende manieren om contact met ons op te nemen.
        </p>

        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 mt-1 text-gray-900 dark:text-white" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">E-mail</h2>
              <p className="text-gray-900 dark:text-gray-300">
                Voor algemene vragen: <a href="mailto:devlamper06@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">devlamper06@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 mt-1 text-gray-900 dark:text-white" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub</h2>
              <p className="text-gray-900 dark:text-gray-300">
                Bugs of vragen over technische aanpassingen zie: <a href="https://github.com/AlexLamper/ChristelijkePodcasts" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">GitHub</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-black dark:text-white">
          <h2 className="text-xl font-semibold mb-2">Veelgestelde vragen</h2>
          <p className="mb-4">
            Voordat u contact met ons opneemt, kunt u wellicht het antwoord op uw vraag vinden in onze FAQ sectie.
          </p>
          <Button asChild>
            <Link href="/help">
              Bekijk FAQ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
