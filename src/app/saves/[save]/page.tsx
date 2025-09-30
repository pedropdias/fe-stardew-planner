'use client'

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Header from "@/components/header/header";
import Image from "next/image";
import PlannersSideBar from "@/components/plannersSideBar/plannersSideBar";
import Spinner from "@/components/loadingSpinner/loadingSpinner";
import {PlannerType} from "@/types/PlannerType";
import CreatePlannerModal from "@/components/createPlannerModal/createPlannerModal";
import {useFetch} from "@/hooks/useFetch";
import {createPlanner} from "@/api/services/PlannerService";
import {PlannerDataType} from "@/api/forms/create-planner.form";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import TaskCard from "@/components/taskCard/taskCard";
import {DragAndDropType} from "@/types/dragAndDropType";

export default function SavePage() {
  const {user, authLoading, fetchPlanners, loadingGetPlanners, selectedPlanner, setSelectedPlanner} = useAppContextProvider()
  const router = useRouter();
  const params = useParams();
  const rawGameSaveIdParam = params.save;
  const gameSaveId = Array.isArray(rawGameSaveIdParam) ? rawGameSaveIdParam[0] : rawGameSaveIdParam;
  const [showModal, setShowModal] = useState(false);

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

  const {
    execute: executeCreatePlanner,
    loading: loadingCreatePlanner,
    error: errorCreatePlanner,
  } = useFetch(createPlanner)

  const handleCreatePlanner = async (plannerData: PlannerDataType): Promise<PlannerType | undefined> => {
    if (!user || !gameSaveId) return;
    try {
      const payload = {
        userId: user.id,
        gameSaveId: gameSaveId,
        plannerData,
      };

      const response = await executeCreatePlanner(payload);

      fetchPlanners({userId: user.id, gameSaveId})
      setShowModal(false);

      if (!response) throw errorCreatePlanner;

      setSelectedPlanner(response?.data);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

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
      {showModal && (
        <>
          <div className="w-[100vw] h-[100vh] fixed inset-0 bg-[#0000006A] backdrop-blur-sm z-[999]"
               style={{backdropFilter: "blur(3px)"}}
          />
          <CreatePlannerModal
            loading={loadingCreatePlanner}
            onConfirm={handleCreatePlanner}
            onCancel={() => setShowModal(false)}
          />
        </>
      )}
      <div
        className="min-h-[100vh] max-w-[100vw] overflow-x-hidden bg-cover bg-center flex flex-col items-center gap-[2.5vh] select-none"
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
          <PlannersSideBar setShowModal={setShowModal} />
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

  const {signOut, t, saves} = useAppContextProvider()

  const [tasks, setTasks] = useState<any>([]);

  const createTaskCard = [{
    id: 1
  }]

  return (
    <div className="flex flex-col items-center justify-start gap-[32px] h-full">
      <div className={"flex flex-col min-h-[400px] justify-start gap-[72px]"}>
        <div className={"flex flex-col justify-start gap-[20px] text-[#FFF] font-stardewSimple font-[100]"}>
          <h1>{planner.name}</h1>
          <h3>{planner.description}</h3>
        </div>

        <div className={"flex justify-between w-full"}>
          <DragAndDropContainer
            data={tasks.length > 0 ? tasks : createTaskCard}
            renderCard={(cardData) => <TaskCard data={cardData}/>}
            type={"task" as DragAndDropType}
          />
          {/*{selectedSave && Object.keys(selectedSave).length > 0 && <SelectedSaveCard data={selectedSave}/>}*/}
        </div>
      </div>
    </div>
  )
}