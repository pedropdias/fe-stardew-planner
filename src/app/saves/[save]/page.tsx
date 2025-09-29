'use client'

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Header from "@/components/header/header";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import Image from "next/image";
import TaskCard from "@/components/taskCard/taskCard";
import PlannersSideBar from "@/components/plannersSideBar/plannersSideBar";
import Spinner from "@/components/loadingSpinner/loadingSpinner";
import {PlannerType} from "@/types/PlannerType";

export default function SavePage() {
  const {user, authLoading, fetchPlanners, loadingGetPlanners, selectedPlanner} = useAppContextProvider()
  const router = useRouter();
  const params = useParams();
  const rawGameSaveIdParam = params.save;
  const gameSaveId = Array.isArray(rawGameSaveIdParam) ? rawGameSaveIdParam[0] : rawGameSaveIdParam;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user || !gameSaveId) return;
    fetchPlanners({userId: user.id, gameSaveId});
  }, [user]);

  return (
    <>
      {loadingGetPlanners && (
        <>
          <div
            className="w-[100vw] h-[100vh] fixed flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.25)] backdrop-blur-sm z-[999] transition-transform"
            style={{backdropFilter: "blur(3px)"}}
          >
            <Spinner />
          </div>
        </>
      )}
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
          {selectedPlanner &&
            <PlannerBoard planner={selectedPlanner} />
          }
        </div>
      </div>
    </>
  )
}

interface PlannerBoardProps {
  planner: PlannerType;
}

export function PlannerBoard({planner}: PlannerBoardProps) {

  const {signOut, t} = useAppContextProvider()

  return (
    <div className="flex flex-col items-center justify-start gap-[32px] h-full">
      <div className={"flex flex-col min-h-[400px] justify-start gap-[72px]"}>
        <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
          <h1>{planner.name}</h1>
          <h3>{planner.description}</h3>
        </div>

        <div className={"flex justify-between w-full"}>
          {/*<DragAndDropContainer*/}
          {/*  data={tasks}*/}
          {/*  renderCard={(cardData) => <TaskCard data={cardData}/>}*/}
          {/*/>*/}
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