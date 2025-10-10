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
import Spinner from "@/components/loadingSpinner/loadingSpinner";
import {DragAndDropType} from "@/types/dragAndDropType";

export default function SavesPage() {
  const {
    user,
    authLoading,
    selectedSave,
    setSelectedSave,
    t,
    fetchSaves,
    saves,
    loadingGetSaves
  } = useAppContextProvider()
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const {
    execute: executeDeleteSave,
    loading: loadingDeleteSave,
    error: errorDeleteSave
  } = useFetch(deleteSave)

  const handleDeleteSave = async () => {
    if (!user || !selectedSave) return;
    try {
      const payload = {
        userId: selectedSave.user_id,
        gameSaveId: selectedSave.game_save_id,

      };
      const response = await executeDeleteSave(payload);

      if (!response) throw errorDeleteSave;

      fetchSaves(user.id);
      setSelectedSave(null);
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
  }, [user]);

  return (
    (!saves || saves.length > 0) ? (
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
              className="w-[100vw] h-[100vh] fixed flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.25)] backdrop-blur-sm z-[999] transition-transform"
              style={{backdropFilter: "blur(3px)"}}
            >
              <Spinner/>
            </div>
          </>
        )}
        <div
          className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[10vh] select-none"
          style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
          <Header/>
          <div className="flex flex-col items-center justify-center gap-[32px]">
            <div className={"flex flex-col justify-center gap-[72px] mb-[100px]"}>
              <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
                <h1>{t("saves.title")}</h1>
                <h3>{t("saves.subTitle")}</h3>
              </div>

              {saves && saves.length > 0 && (
                <div className={"flex justify-between w-full min-h-[300px]"}>
                  <DragAndDropContainer
                    data={saves}
                    renderCard={(cardData) => <SaveCard data={cardData}/>}
                    type={"save" as DragAndDropType}
                  />
                  {selectedSave && Object.keys(selectedSave).length > 0 &&
                      <SelectedSaveCard data={selectedSave} setShowModal={setShowModal}/>}
                </div>
              )}
            </div>
            <Image
              src={"/starfruit.png"}
              alt={"starfruit"}
              width={110}
              height={110}
            />
          </div>
        </div>
      </>
    ) : <SavesPageFallback/>
  )
}

export function SavesPageFallback() {
  const { t } = useAppContextProvider();

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[14vh] select-none text-[#FFF]"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header/>
      <h1 className={"font-stardewMain font-[100] text-[3rem]"}>{t("savesFallback.title")}</h1>
      <div className={"flex flex-col items-center justify-center gap-[4px] font-stardewSimple text-[1.5rem]"}>
        <p>{t("savesFallback.text1")}</p>
        <button
          className={"flex justify-between items-center bg-transparent px-[24px] py-[16px] my-[32px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] cursor-pointer text-[1.5rem] font-stardewMain text-[2rem] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-120"}
          style={{
            backgroundImage: "url('/default-button-extra-large.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
          }}
        >
          {t("savesFallback.buttonText")}
        </button>
        <p>{t("savesFallback.text2")}</p>
        <p>{t("savesFallback.text3")}</p>
        <p>{t("savesFallback.text4")}</p>
      </div>
    </div>
  )
}