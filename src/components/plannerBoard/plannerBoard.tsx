"use client"

import {PlannerType} from "@/types/PlannerType";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useEffect} from "react";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import TaskCard from "@/components/taskCard/taskCard";
import {DragAndDropType} from "@/types/dragAndDropType";
import Image from "next/image";
import {useParams} from "next/navigation";
import SelectedTaskCard from "@/components/selectedTaskCard/selectedTaskCard";

interface PlannerBoardProps {
  planner: PlannerType;
  setShowEditModal: (showEditModal: boolean) => void;
  setShowCreateTaskModal: (showCreateTaskModal: boolean) => void;
  setShowDeleteTaskModal: (showDeleteTaskModal: boolean) => void;
}

export default function PlannerBoard({
                                       planner,
                                       setShowEditModal,
                                       setShowCreateTaskModal,
                                       setShowDeleteTaskModal
                                     }: PlannerBoardProps) {
  const {user, tasks, selectedTask, selectedPlanner, setSelectedTask, fetchTasks, fetchPlanners, fetchSaves} = useAppContextProvider();
  const params = useParams();
  const rawGameSaveIdParam = params.save;
  const gameSaveId = Array.isArray(rawGameSaveIdParam) ? rawGameSaveIdParam[0] : rawGameSaveIdParam;

  const defaultTask = [{
    id: 1,
    plannerId: planner.id,
    name: "Create your first task",
    description: "",
    days: 0,
    isDefault: true,
    setShowCreateTaskModal: setShowCreateTaskModal,
  }]

  useEffect(() => {
    if (!user || !gameSaveId) return;
    fetchSaves(user.id);
    fetchPlanners({userId: user.id, gameSaveId});
    fetchTasks({userId: user.id, gameSaveId, plannerId: planner.id.toString()})
  }, [user, planner.id]);

  useEffect(() => {
    setSelectedTask(null)
  }, [selectedPlanner]);

  return (
    <>
      <div className={"flex flex-col min-h-[400px] w-full justify-start gap-[40px]"}>
        <div className={"flex justify-between items-center gap-[48px] text-[#FFF] font-stardewSimple font-[100]"}>
          <div className={"flex flex-col justify-start gap-[10px]"}>
            <h1 className={"whitespace-normal break-words max-w-[800px] text-[2rem]"}>{planner.name}</h1>
            <p className={"text-[1.3rem]"}>{planner.description}</p>
          </div>
          <div className={"flex flex-row-reverse gap-[20px]"}>
            <Image
              src={"/edit-button.png"}
              alt={"edit-button"}
              width={60}
              height={60}
              className={"transition-transform duration-50 hover:scale-[1.03] hover:brightness-125 cursor-pointer"}
              onClick={() => setShowEditModal(true)}
            />
            <Image
              src={"/add-button.png"}
              alt={"add-button"}
              width={60}
              height={60}
              className={"transition-transform duration-50 hover:scale-105 hover:brightness-125 cursor-pointer"}
              onClick={() => setShowCreateTaskModal(true)}
            />
          </div>
        </div>

        <div className={"flex justify-between w-full"}>
          <DragAndDropContainer
            data={(tasks && tasks.length > 0) ? tasks : defaultTask}
            renderCard={(cardData) => <TaskCard data={cardData}/>}
            type={"task" as DragAndDropType}
          />
          {selectedTask && Object.keys(selectedTask).length > 0 &&
              <SelectedTaskCard data={selectedTask} setShowDeleteTaskModal={setShowDeleteTaskModal}/>}
        </div>
      </div>
    </>
  )
}