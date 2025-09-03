"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {AppContextType} from "@/types/AppContextProviderType";
import {supabase} from "@/api/supabase/supabaseClient";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setAuthLoading(false)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setAuthLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  })

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AppContext.Provider
      value={{
        user,
        authLoading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContextProvider() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContextProvider must be used inside AppProvider");
  return context;
}