"use client"

import * as React from "react"
import Link from "next/link"
import { Home, Search, Library, PlusCircle, Heart } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar className="bg-black">
      <SidebarHeader>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-500">Christelijke</h1>
          <p className="text-sm text-gray-400">Podcasts</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-6 text-white hover:text-gray-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center">
                <Home className="mr-4 text-white hover:text-gray-300" />
                <span className="text-white hover:text-gray-300">
                    Home
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/search" className="flex items-center">
                <Search className="mr-4 text-white hover:text-gray-300" />
                <span className="text-white hover:text-gray-300">
                    Zoeken
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/library" className="flex items-center">
                <Library className="mr-4 text-white hover:text-gray-300" />
                <span className="text-white hover:text-gray-300">
                    Jouw Podcasts
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-6 text-white hover:text-gray-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center">
                <PlusCircle className="mr-4 text-white hover:text-gray-300" />
                <span className="text-white hover:text-gray-300">
                    Playlist Aanmaken
                </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center">
                <Heart className="mr-4 text-white hover:text-gray-300" />
                <span className="text-white hover:text-gray-300">
                    Favoriete Podcasts
                </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
