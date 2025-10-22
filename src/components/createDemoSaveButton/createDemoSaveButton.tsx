import React from "react";
import {CreateDemoSaveForm} from "@/api/forms/create-demo-save.form";
import demoSaveData from './demo_game_save.json'
import {useFetch} from "@/hooks/useFetch";
import {createDemoSave} from "@/api/services/SaveService";
import {useAppContextProvider} from "@/providers/AppContextProvider";

interface CreateDemoSaveButtonProps {
  userId: string;
  email: string;
  disabled: boolean;
}

export default function CreateDemoSaveButton({userId, email, disabled}: CreateDemoSaveButtonProps) {
  const { user, fetchSaves, t } = useAppContextProvider();

  const createDemoSaveForm = {
    userId,
    email,
    gameSaveId: `Demo_Save_${userId}`,
    saveData: {
      ...demoSaveData,
      saveName: `Demo Save`,
    }
  } as unknown as CreateDemoSaveForm;

  const {
    execute: executeCreateDemoSave,
    loading: loadingCreateDemoSave,
    error: errorCreateDemoSave,
  } = useFetch(createDemoSave);

  const handleCreateDemoSave = async () => {
    try {
      if (!user) return;
      const response = await executeCreateDemoSave(createDemoSaveForm);

      if (!response) throw errorCreateDemoSave;
      await fetchSaves(userId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleCreateDemoSave}
      className="flex justify-between items-center bg-transparent px-[24px] py-[16px] my-[32px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer text-[2rem] font-stardewMain shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-105 hover:brightness-110 no-underline text-[var(--primary-dark-text)]"
      style={{
        backgroundImage: "url('/default-button-extra-large.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textShadow: "2px 2px 0px rgba(135,52,0,0.5)",
      }}
      disabled={disabled || loadingCreateDemoSave}
    >
      {t("savesFallback.createSaveButtonText")}
    </button>
  );
}