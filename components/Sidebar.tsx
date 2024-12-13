"use client";

import Link from "next/link"
import { Home, Search, Library, PlusCircle, Heart, Menu } from 'lucide-react'
import { useState } from 'react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:block bg-black w-64 p-6 overflow-y-auto h-full z-10`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-500">Christelijke</h1>
          <p className="text-sm text-gray-400">Podcasts</p>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="flex items-center text-gray-300 hover:text-white">
                <Home className="mr-4" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="flex items-center text-gray-300 hover:text-white">
                <Search className="mr-4" />
                Zoeken
              </Link>
            </li>
            <li>
              <Link href="/library" className="flex items-center text-gray-300 hover:text-white">
                <Library className="mr-4" />
                Jouw podcasts
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8">
          <button className="flex items-center text-gray-300 hover:text-white">
            <PlusCircle className="mr-4" />
            Playlist Maken
          </button>
          <button className="flex items-center mt-4 text-gray-300 hover:text-white">
            <Heart className="mr-4" />
            Favoriete Podcasts
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar

