import {Dispatch, SetStateAction} from "react";

export type AppContextType = {
  user: any | null
  authLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  selectedSave: any | null
  setSelectedSave: Dispatch<SetStateAction<any>>
  locale: "pt-BR" | "en-US";
  setLocale: (loc: "pt-BR" | "en-US") => void;
  t: (key: string, vars?: Record<string, string>) => string;
}