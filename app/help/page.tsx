'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function HelpPage() {
  const [openAll, setOpenAll] = useState(false)

  const faqItems = [
    {
      question: "Hoe kan ik podcasts zoeken?",
      answer: "Op de hoofdpagina vindt u een lijst met populaire podcasts. U kunt de filters gebruiken om podcasts te vinden die aan uw voorkeuren voldoen, zoals frequentie, doelgroep, taal en duur."
    },
    {
      question: "Hoe voeg ik een podcast toe aan mijn favorieten?",
      answer: "Klik op het hartpictogram naast de podcast die u wilt toevoegen aan uw favorieten. Het pictogram wordt rood wanneer de podcast is toegevoegd. U kunt uw favorieten vinden bovenaan de hoofdpagina."
    },
    {
      question: "Hoe verwijder ik een podcast uit mijn favorieten?",
      answer: "Ga naar de sectie 'Favoriete Podcasts' bovenaan de hoofdpagina. Klik op het minteken naast de podcast die u wilt verwijderen uit uw favorieten."
    },
    {
      question: "Wat betekenen de verschillende filters?",
      answer: "De filters helpen u bij het vinden van podcasts die aan uw voorkeuren voldoen. 'Frequentie' geeft aan hoe vaak nieuwe afleveringen worden uitgebracht, 'Doelgroep' voor wie de podcast is bedoeld, 'Taal' in welke taal de podcast is, en 'Duur' hoe lang de gemiddelde aflevering duurt."
    },
    {
      question: "Hoe kan ik een podcast beluisteren?",
      answer: "Klik op de podcastafbeelding of titel om naar de Spotify-pagina van de podcast te gaan. Daar kunt u de podcast beluisteren of toevoegen aan uw Spotify-bibliotheek."
    },
    {
      question: "Worden mijn favorieten opgeslagen?",
      answer: "Ja, uw favoriete podcasts worden opgeslagen in de lokale opslag van uw browser. Ze blijven bewaard, zelfs als u de pagina sluit of uw browser opnieuw opstart."
    }
  ]

  return (
    <div className="p-6 md:p-12 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Help & Veelgestelde Vragen</h1>
      
      <p className="mb-6 text-gray-100">
        Welkom op onze helppagina. Hier vindt u antwoorden op veelgestelde vragen over het gebruik van onze podcast ontdekkingsservice. 
        Als u uw vraag hier niet kunt vinden, neem dan gerust contact met ons op.
      </p>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Button 
          onClick={() => setOpenAll(!openAll)} 
          variant="outline"
          className='text-black'
        >
          {openAll ? 'Alles sluiten' : 'Alles openen'}
        </Button>
      </div>

      <Accordion type="multiple" className="w-full" value={openAll ? faqItems.map((_, index) => `item-${index}`) : undefined}>
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 p-4 bg-gray-200 rounded-lg text-black">
        <h2 className="text-xl font-semibold mb-2">Nog steeds hulp nodig?</h2>
        <p className="mb-4">
          Als u uw vraag niet in onze FAQ kunt vinden, neem dan contact met ons op. We staan klaar om u te helpen!
        </p>
        <Button asChild>
          <Link href="/contact">Neem contact op</Link>
        </Button>
      </div>
    </div>
  )
}

