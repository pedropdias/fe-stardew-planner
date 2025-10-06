import {PlannerType} from "@/types/PlannerType";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useState} from "react";
import {DragAndDropContainer} from "@/components/dragAndDropContainer/dragAndDropContainer";
import TaskCard from "@/components/taskCard/taskCard";
import {DragAndDropType} from "@/types/dragAndDropType";
import Image from "next/image";
import ConfirmModal from "@/components/confirmModal/confirmModal";

interface PlannerBoardProps {
  planner: PlannerType;
  setShowEditModal: (showEditModal: boolean) => void;
}

export default function PlannerBoard({planner, setShowEditModal}: PlannerBoardProps) {
  const [tasks, setTasks] = useState<any>([]);

  const createTaskCard = [{
    id: 1
  }]

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-[32px] h-full">
        <div className={"flex flex-col min-h-[400px] justify-start gap-[72px]"}>
          <div className={"flex justify-between items-center gap-[48px] text-[#FFF] font-stardewSimple font-[100]"}>
            <div className={"flex flex-col justify-start gap-[20px]"}>
              <h1>{planner.name}</h1>
              <h3>{planner.description}</h3>
            </div>
            <div className={"flex flex-row-reverse gap-[20px]"}>
              <Image
                src={"/edit-button.png"}
                alt={"edit-button"}
                width={60}
                height={60}
                className={"transition-transform duration-50 hover:scale-103 hover:brightness-125 cursor-pointer"}
                onClick={() => setShowEditModal(true)}
              />
              <Image
                src={"/add-button.png"}
                alt={"add-button"}
                width={60}
                height={60}
                className={"transition-transform duration-50 hover:scale-103 hover:brightness-125 cursor-pointer"}
                // onClick={() => }
              />
            </div>
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
    </>
  )
}