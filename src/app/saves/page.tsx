'use client'

import Image from "next/image";
import {useEffect, useState} from "react";
import {deleteSave, getSaves} from "@/api/services/SaveService";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useFetch} from "@/hooks/useFetch";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import {useRouter} from "next/navigation";
import SaveCard from "@/components/saveCard/saveCard";
import Header from "@/components/header/header";
import SelectedSaveCard from "@/components/selectedSaveCard/selectedSaveCard";
import ConfirmModal from "@/components/confirmModal/confirmModal";

export default function SavesPage() {
  const {user, signOut, authLoading, selectedSave, setSelectedSave, t, fetchSaves, saves} = useAppContextProvider()
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const {
    execute: executeGetSaves,
    loading: loadingGetSaves,
    error: errorGetSaves
  } = useFetch(getSaves)

  const {
    execute: executeDeleteSave,
    loading: loadingDeleteSave,
    error: errorDeleteSave
  } = useFetch(deleteSave)

  const handleDeleteSave = async () => {
    if (!user) return;
    try {
      const payload = {
        userId: selectedSave.user_id,
        gameSaveId: selectedSave.game_save_id,

      };

      await executeDeleteSave(payload);
      fetchSaves(user.id);
      setSelectedSave({});
      setShowModal(false);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    fetchSaves(user.id);
  }, [executeGetSaves, user]);

  return (
    <>
      {showModal && (
        <>
          <div className="w-[100vw] h-[100vh] fixed inset-0 bg-[#000000B3] backdrop-blur-sm z-[999]"
               style={{backdropFilter: "blur(3px)"}}
          />
          <ConfirmModal
            title={t("deleteSaveModal.title")}
            description={t("deleteSaveModal.description")}
            confirmText={t("deleteSaveModal.delete")}
            cancelText={t("deleteSaveModal.cancel")}
            loading={loadingDeleteSave}
            onConfirm={handleDeleteSave}
            onCancel={() => setShowModal(false)}
          />
        </>
      )}
      {loadingGetSaves && (
        <>
          <div
            className="w-[100vw] h-[100vh] fixed flex justify-center items-center inset-0 bg-[#000000B3] backdrop-blur-sm z-[999] transition-transform"
            style={{backdropFilter: "blur(3px)"}}
          >
            <span
              className={"absolute w-[100px] h-[100px] border-2 border-[#FFF] border-t-transparent rounded-full animate-spin"}></span>
          </div>
        </>
      )}
      <div
        className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[10vh] select-none"
        style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
        <Header/>
        <div className="flex flex-col items-center justify-center gap-[32px]">
          <div className={"flex flex-col justify-center gap-[72px]"}>
            <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
              <h1>{t("saves.title")}</h1>
              <h3>{t("saves.subTitle")}</h3>
            </div>

            <div className={"flex justify-between w-full"}>
              <DragAndDropContainer
                data={saves}
                renderCard={(cardData) => <SaveCard data={cardData}/>}
              />
              {selectedSave && Object.keys(selectedSave).length > 0 &&
                  <SelectedSaveCard data={selectedSave} setShowModal={setShowModal}/>}
            </div>
          </div>
          <Image
            src={"/starfruit.png"}
            alt={"starfruit"}
            width={110}
            height={110}
          />
          <button onClick={signOut} className={"cursor-pointer mb-[100px] bg-transparent shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-125"}>
            <Image src="/exit-button.png" alt="exit-button" width={157} height={100}/>
          </button>
        </div>
      </div>
    </>
  )
}