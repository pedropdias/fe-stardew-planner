'use client'

import Image from "next/image";
import {useEffect, useState} from "react";
import {getSaves} from "@/api/services/SaveService";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useFetch} from "@/hooks/useFetch";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import {useRouter} from "next/navigation";
import SaveCard from "@/components/saveCard/saveCard";
import Header from "@/components/header/header";
import SelectedSaveCard from "@/components/selectedSaveCard/selectedSaveCard";

export default function SavesPage() {
  const { user, signOut, authLoading, selectedSave, t } = useAppContextProvider()
  const router = useRouter();
  const [saves, setSaves] = useState([]);

  const {
    execute: executeGetSaves,
    loading: loadingGetSaves,
    error: errorGetSaves
  } = useFetch(getSaves)

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    const fetchSaves = async () => {
      if (!user) return;
      try {
        const result = await executeGetSaves(user.id);
        setSaves(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaves();
  }, [executeGetSaves, user]);

  useEffect(() => {
    console.log("selectedSave:", selectedSave);
  }, [selectedSave]);

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[10vh] select-none"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header />
      <div className="flex flex-col items-center justify-center gap-[32px]">
        <div className={"flex flex-col justify-center gap-[72px]"}>
          <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
            <h1>{t("saves.title")}</h1>
            <h3>{t("saves.subTitle")}</h3>
          </div>

          <div className={"flex justify-between w-full"}>
            <DragAndDropContainer
              data={saves}
              renderCard={(cardData) => <SaveCard data={cardData} />}
            />
            {selectedSave && Object.keys(selectedSave).length > 0 && <SelectedSaveCard data={selectedSave}/>}
          </div>
        </div>
        <Image
          src={"/starfruit.png"}
          alt={"starfruit"}
          width={110}
          height={110}
        />
        <button onClick={signOut} className={"py-[24px] px-[48px] rounded-[20px] text-[1.2rem] cursor-pointer mb-[100px]"}>Sair
        </button>
      </div>
    </div>
  )
}