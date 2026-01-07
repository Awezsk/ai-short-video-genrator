"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { signOut } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfigs'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import Link from 'next/link'

function Header() {
    const {user} =useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();
    return (
        <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <Image  src={'/logo.svg'}
                    alt='logo'
                    width={40}
                    height={40}
                />
                <h2 className='text-2xl font-bold'>Video Gen</h2>
            </div>
            <div>
                { !user ? (
                    <Authentication>
                        <Button>Get Started</Button>
                    </Authentication>
                ) : (
                    <div className='flex items-center gap-3'>
                        <Link href={'/dashboard'}>
                            <Button>Dashboard</Button>
                        </Link>
                        {user?.pictureURL && (
                            <div className='relative'>
                                <button onClick={() => setShowMenu(s => !s)} title="User menu" className='focus:outline-none'>
                                    <Image
                                        src={user.pictureURL}
                                        alt='userImage'
                                        width={40}
                                        height={40}
                                        className='rounded-full cursor-pointer'
                                    />
                                </button>
                                {showMenu && (
                                    <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50'>
                                        <button
                                            className='w-full text-left px-4 py-2 hover:bg-gray-100'
                                            onClick={async () => { try { await signOut(auth); } finally { setShowMenu(false); router.replace('/'); } }}
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
            )
    }

export default Header
