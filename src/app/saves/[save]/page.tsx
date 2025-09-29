'use client'

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Header from "@/components/header/header";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import Image from "next/image";
import TaskCard from "@/components/taskCard/taskCard";
import PlannersSideBar from "@/components/plannersSideBar/plannersSideBar";

export default function SavePage() {
  const {user, authLoading} = useAppContextProvider()
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  return (
    <div
      className="min-h-[100vh] bg-cover bg-center flex flex-col items-center gap-[2.5vh] select-none"
      style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
      <Header/>
      <div
        className="flex justify-start w-full ml-[20px] cursor-pointer"
        onClick={() => router.push("/saves")}
      >
        <Image
          src={"/back-button.png"}
          alt={"back-button"}
          width={134}
          height={55}
          className={"transition-transform duration-50 hover:scale-103 hover:brightness-125"}
        />
      </div>
      <div className="flex justify-start w-full h-full gap-[100px] px-[24px] py-[8px]">
        <PlannersSideBar/>
        <TaskBoard/>
      </div>
    </div>
  )
}

export function TaskBoard() {

  const {signOut, t} = useAppContextProvider()
  const [tasks, setTasks] = useState([]);

  return (
    <div className="flex flex-col items-center justify-start gap-[32px] h-full">
      <div className={"flex flex-col min-h-[400px] justify-start gap-[72px]"}>
        <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
          <h1>{t("save.title")}</h1>
          <h3>{t("save.subTitle")}</h3>
        </div>

        <div className={"flex justify-between w-full"}>
          <DragAndDropContainer
            data={tasks}
            renderCard={(cardData) => <TaskCard data={cardData}/>}
          />
          {/*{selectedSave && Object.keys(selectedSave).length > 0 && <SelectedSaveCard data={selectedSave}/>}*/}
        </div>
      </div>
      <Image
        src={"/starfruit.png"}
        alt={"starfruit"}
        width={110}
        height={110}
      />
      <button onClick={signOut}
              className={"cursor-pointer mb-[100px] bg-transparent shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-125"}>
        <Image src="/exit-button.png" alt="exit-button" width={157} height={100}/>
      </button>
    </div>
  )
}