"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {AppContextType} from "@/types/AppContextProviderType";
import {supabase} from "@/api/supabase/supabaseClient";
import ptBR from "@/locales/pt-br.json";
import enUS from "@/locales/en-us.json";
import {getSaves} from "@/api/services/SaveService";
import {getPlanners} from "@/api/services/PlannerService";
import {useFetch} from "@/hooks/useFetch";
import {GetPlannersForm} from "@/api/forms/get-planners.form";
import {SaveType} from "@/types/saveType";
import {PlannerType} from "@/types/PlannerType";

const messages = {
  "pt-BR": ptBR,
  "en-US": enUS,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [selectedSave, setSelectedSave] = useState<SaveType | null>(null);
  const [locale, setLocaleState] = useState<"pt-BR" | "en-US">("en-US");
  const [saves, setSaves] = useState<SaveType[]>([]);
  const [planners, setPlanners] = useState<PlannerType[]>([]);
  const [selectedPlanner, setSelectedPlanner] = useState<PlannerType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("locale") as "pt-BR" | "en-US" | null;
    if (stored) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (loc: "pt-BR" | "en-US") => {
    setLocaleState(loc);
    localStorage.setItem("locale", loc);
  };

  const t = (key: string, vars: Record<string, string> = {}) => {
    const keys = key.split(".");
    let value: any = messages[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    if (!value) return key;
    return Object.keys(vars).reduce(
      (str, v) => str.replace(`{{${v}}}`, vars[v]),
      value
    );
  };

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
  }, [])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const {
    execute: executeGetSaves,
    loading: loadingGetSaves,
  } = useFetch(getSaves);

  const fetchSaves = async (userId: string) => {
    if (!user) return;
    try {
      const result = await executeGetSaves(userId);
      setSaves(result ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    execute: executeGetPlanners,
    loading: loadingGetPlanners,
  } = useFetch(getPlanners);

  const fetchPlanners = async ({userId, gameSaveId}: GetPlannersForm) => {
    if (!user) return;
    try {
      const result = await executeGetPlanners({userId, gameSaveId})
      setPlanners(result ?? []);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        authLoading,
        signInWithGoogle,
        signOut,
        selectedSave,
        setSelectedSave,
        saves,
        setSaves,
        fetchSaves,
        loadingGetSaves,
        planners,
        setPlanners,
        selectedPlanner,
        setSelectedPlanner,
        fetchPlanners,
        loadingGetPlanners,
        locale,
        setLocale,
        t,
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