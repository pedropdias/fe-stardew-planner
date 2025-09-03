import {Dispatch, SetStateAction} from "react";

export type AppContextType = {
  // Auth
  user: any | null
  authLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}