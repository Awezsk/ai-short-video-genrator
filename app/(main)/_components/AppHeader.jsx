"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/app/provider'
import {SidebarTrigger} from '@/components/ui/sidebar'
import Image from 'next/image'
import { signOut } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfigs'

function AppHeader() {
    const {user}=useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
  return (
    <div className='p-3 flex justify-between items-center'>
      <SidebarTrigger/>
      {user?.pictureURL && (
        <div className='relative'>
          <button onClick={() => setShowMenu(s => !s)} title="User menu" className='focus:outline-none'>
            <Image src={user.pictureURL} alt='user' width={40} height={40} className='rounded-full cursor-pointer'/>
          </button>
          {showMenu && (
            <div className='absolute right-0 mt-2 w-36 bg-white text-black rounded shadow-lg z-50'>
              <button className='w-full text-left px-3 py-2 hover:bg-gray-100' onClick={async () => { try { await signOut(auth); } finally { setShowMenu(false); router.replace('/'); } }}>Sign out</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AppHeader
