"use client"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../configs/firebaseConfigs';
import { useRouter } from 'next/navigation';

// ✅ BEST PRACTICE: Create provider once outside component
const googleProvider = new GoogleAuthProvider();

function Authentication({children}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSignInClick = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            console.log('User signed in successfully:', user);
            
            // Redirect to dashboard
            router.push('/dashboard');
            
        } catch (error) {
            console.error('Sign-in error:', error);
            
            // User-friendly error messages
            switch (error.code) {
                case 'auth/unauthorized-domain':
                    alert('⚠️ This domain is not authorized. Please contact support.');
                    break;
                case 'auth/popup-closed-by-user':
                    console.log('User closed the popup');
                    break;
                case 'auth/popup-blocked':
                    alert('⚠️ Please allow popups for this site and try again.');
                    break;
                case 'auth/cancelled-popup-request':
                    console.log('Popup request cancelled');
                    break;
                default:
                    alert(`⚠️ Sign-in failed: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div 
            onClick={onSignInClick} 
            className={isLoading ? 'cursor-wait opacity-50' : 'cursor-pointer'}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    )
}

export default Authentication
