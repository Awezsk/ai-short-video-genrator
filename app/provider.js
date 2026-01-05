"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfigs'
import { AuthContext } from './_context/AuthContext'
import { useMutation } from "convex/react";
import { api } from '@/convex/_generated/api'

function Provider({ children }) {
    const [user, setUser] = useState(null);
    const CreateUser = useMutation(api.users.CreateNewUser);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("Firebase user:", firebaseUser);

            if (firebaseUser) {
                try {
                    const convexUser = await CreateUser({
                        name: firebaseUser.displayName || "",
                        email: firebaseUser.email,
                        pictureURL: firebaseUser.photoURL || "",
                    });
                    
                    console.log("Convex user:", convexUser);
                    console.log("User ID:", convexUser?._id);
                    
                    // Now convexUser will always have the complete user object with _id
                    setUser(convexUser);
                } catch (error) {
                    console.error("Error creating/fetching user:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        });
       
        return () => unsubscribe();
    }, [CreateUser]);
    
    return (
        <div>
            <AuthContext.Provider value={{ user }}>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </NextThemesProvider>
            </AuthContext.Provider>
        </div>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}

export default Provider
