"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { HomeIcon, LucideFileVideo, Search, Wallet , Gem} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '../../provider'

const MenuItems=[
      {
        title:'Home',
        url:'/dashboard',
        icon:HomeIcon
      },
      {
        title:'Create New Video',
        url:'/create-new-video',
        icon:LucideFileVideo
      },
            {
        title:'Explore',
        url:'/explore',
        icon:Search
      },
            {
        title:'Billing',
        url:'/billing',
        icon:Wallet
      },

]

function AppSidebar() {
  const path=usePathname();
  const {user}=useAuthContext();
  console.log(path);
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className='flex items-center gap-3 w-full justify-center mt-5'>
            <Image src={'/logo.svg'} alt='logo' width={50} height={50}/>
            <h2 className='font-bold text-2xl'>Video Gen</h2>
          </div>
          <h2 className='text-lg text-gray-400 text-center mt-3'>Ai Short video Generator</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='mx-5 mt-8'>
              <Link href={'/create-new-video'}>
                <Button className="w-full">+Create New Video</Button>
              </Link>
            </div>
            <SidebarMenu>
                {MenuItems.map((menu,index)=>(
                  <SidebarMenuItem className="mt-3 mx-5" key={index}>
                        <SidebarMenuButton className="p-5">
                          <Link href={menu?.url} className='flex items-center gap-4 p-3'>
                              <menu.icon/>
                              <span>{menu?.title}</span>
                          </Link>
                        </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
          <div className='flex items-center justify-between'>
            <Gem className='text-gray-400'/>
            <h2 className='text-gray-400'>{user?.credits} credits left</h2>
          </div>
          <Button className="w-full mt-3">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
