"use client"

import * as React from "react"
import Link from "next/link"
import { HelpCircleIcon, Home, Library, Phone } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
// import DailyVerse from "@/components/DailyVerse"

export function AppSidebar() {
  return (
    <Sidebar className="bg-black">
      <SidebarHeader>
        <div className="px-6 pt-6">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold text-green-500">Christelijke</h1>
          </Link>
          <p className="text-sm text-gray-400">Podcasts</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-6 text-white hover:text-gray-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* <DailyVerse /> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-6 text-white hover:text-gray-300">
        <SidebarMenu>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton className="flex items-center text-white hover:text-gray-300">
              <Link href="/" className="flex items-center">
                <Home className="mr-4" />
                  Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton className="flex items-center text-white hover:text-gray-300">
              <Link href="/favorieten" className="flex items-center">
                <Library className="mr-4" />
                  Favorieten
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton className="flex items-center text-white hover:text-gray-300">
              <Link href="/contact" className="flex items-center">
                <Phone className="mr-4" />
                  Contact
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton className="flex items-center text-white hover:text-gray-300">
              <Link href="/help" className="flex items-center">
                <HelpCircleIcon className="mr-4" />
                  Help
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

