import {Dispatch, SetStateAction} from "react";
import {GetPlannersForm} from "@/api/forms/get-planners.form";
import {PlannerType} from "@/types/PlannerType";

export type AppContextType = {
  user: any | null
  authLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  selectedSave: any | null
  setSelectedSave: Dispatch<SetStateAction<any>>
  saves: any | null
  setSaves: Dispatch<SetStateAction<any>>
  fetchSaves: (userId: string) => Promise<void>
  loadingGetSaves: boolean
  planners: PlannerType[] | null
  setPlanners: Dispatch<SetStateAction<PlannerType[]>>
  selectedPlanner: PlannerType | null
  setSelectedPlanner: Dispatch<SetStateAction<PlannerType>>
  fetchPlanners: ({userId, gameSaveId}: GetPlannersForm) => Promise<void>
  loadingGetPlanners: boolean
  locale: "pt-BR" | "en-US";
  setLocale: (loc: "pt-BR" | "en-US") => void;
  t: (key: string, vars?: Record<string, string>) => string;
}