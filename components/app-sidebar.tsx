"use client";

import * as React from "react";
import Link from "next/link";
import { HelpCircleIcon, Home, Library, Phone } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="">
      <div className="h-full bg-gray-100 dark:bg-black">
        <SidebarHeader>
          <div className="px-6 pt-6">
            <Link href="/">
              <h1 className="text-3xl font-bold text-green-600 dark:text-green-500">Christelijke</h1>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-100">Podcasts</p>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-6 text-black dark:text-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                {/* Add content here if needed */}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 text-black dark:text-white">
          <SidebarMenu>
            <SidebarMenuItem className="py-2">
              <SidebarMenuButton className="flex items-center hover:text-gray-500 dark:hover:text-gray-300">
                <Link
                  href="/"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center"
                >
                  <Home className="mr-4 text-gray-800 dark:text-white" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2">
              <SidebarMenuButton className="flex items-center hover:text-gray-500 dark:hover:text-gray-300">
                <Link
                  href="/favorieten"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center"
                >
                  <Library className="mr-4 text-gray-800 dark:text-white" />
                  Favorieten
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2">
              <SidebarMenuButton className="flex items-center hover:text-gray-500 dark:hover:text-gray-300">
                <Link
                  href="/contact"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center"
                >
                  <Phone className="mr-4 text-gray-800 dark:text-white" />
                  Contact
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2">
              <SidebarMenuButton className="flex items-center hover:text-gray-500 dark:hover:text-gray-300">
                <Link
                  href="/help"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center"
                >
                  <HelpCircleIcon className="mr-4 text-gray-800 dark:text-white" />
                  Help
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
