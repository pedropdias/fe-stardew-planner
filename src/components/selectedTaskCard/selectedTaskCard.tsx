'use client'

import {useAppContextProvider} from "@/providers/AppContextProvider";
import {useParams} from "next/navigation";
import Image from "next/image";
import {TaskType} from "@/types/saveType";
import {useEffect, useState} from "react";
import {useFetch} from "@/hooks/useFetch";
import {editTask} from "@/api/services/TaskService";

interface SelectedTaskCardProps {
  data: TaskType;
  setShowDeleteTaskModal: (showModal: boolean) => void;
}

export default function SelectedTaskCard({data, setShowDeleteTaskModal}: SelectedTaskCardProps) {
  const {t, setSelectedTask, selectedTask, user, selectedPlanner, fetchTasks} = useAppContextProvider();

  const params = useParams();
  const rawGameSaveIdParam = params.save;
  const gameSaveId = Array.isArray(rawGameSaveIdParam) ? rawGameSaveIdParam[0] : rawGameSaveIdParam;

  const [taskData, setTaskData] = useState<TaskType>(data)
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [isDaysEditing, setIsDaysEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setTaskData((prev) => (
      {
        ...prev,
        [name]: name === "days" ? Number(value) : value,
      }
    ));
  };

  const {
    execute: executeEditTask,
    loading: loadingEditTask,
    error: errorEditTask
  } = useFetch(editTask)

  const handleEditTask = async () => {
    if (!user || !gameSaveId || !selectedPlanner || !selectedTask) return;

    const response = await executeEditTask({
      userId: user.id,
      gameSaveId: gameSaveId,
      taskData: {
        id: taskData.id,
        plannerId: taskData.plannerId,
        name: taskData.name,
        description: taskData.description,
        days: taskData.days,
      }
    })

    if (!response) throw errorEditTask;

    fetchTasks({userId: user.id, gameSaveId, plannerId: taskData.plannerId.toString()})
    return response;
  }

  useEffect(() => {
    setTaskData(data);
  }, [selectedTask]);

  return (
    <div
      className={"flex flex-col justify-between h-[612px] w-[434px] bg-transparent p-[32px] pt-[16px] shadow-[2px_2px_6px_0px_rgba(0,0,0,0.15)] font-stardewSimple text-[1.6rem]"}
      style={{
        backgroundImage: "url('/default-selected-card.png')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
      }}
    >
      <div className={"flex justify-between items-center w-full"}>
        {isTitleEditing ? (
          <textarea
            value={taskData.name}
            name="name"
            onChange={(e) => handleChange(e)}
            onBlur={() => {
              setIsTitleEditing(false);
              if (!taskData.name) {
                setTaskData((prev) => ({ ...prev, name: data.name }));
              }
            }}
            autoFocus
            className="font-[400] font-stardewSimple text-[2.4rem] align-middle max-w-[250px] w-full h-fit mt-[24px] whitespace-normal break-words overflow-hidden resize-none focus:outline-none bg-transparent"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
            }}
          />
        ) : (
          <h2
            className="font-[400] max-w-[250px] whitespace-normal break-words overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
            onClick={() => setIsTitleEditing(true)}
          >
            {taskData.name || data.name}
          </h2>
        )}
        <div className={"flex justify-between items-center gap-[16px]"}>
          <div className={"cursor-pointer transition-transform duration-50 hover:scale-103"}
               onClick={() => setShowDeleteTaskModal(true)}>
            <Image src="/delete-button.png" alt="delete-button" width={36} height={36}/>
          </div>
          <div className={"flex justify-between items-center mb-[12px]"} onClick={() => setSelectedTask(null)}>
            <p
              className={"text-[4rem] text-[#2b2320] font-stardewMain cursor-pointer transition-transform duration-50 hover:scale-103"}>x</p>
          </div>
        </div>
      </div>
      {isDescriptionEditing ? (
        <div className={"flex items-start w-full h-full"}>
          <textarea
            value={taskData.description}
            name="description"
            onChange={(e) => handleChange(e)}
            onBlur={() => {
              setIsDescriptionEditing(false);
              if (!taskData.description) {
                setTaskData((prev) => ({ ...prev, description: data.description }));
              }
            }}
            autoFocus
            className="font-[400] font-stardewSimple text-[1.6rem] max-w-[360px] w-[350px] h-full mt-[48px] whitespace-normal break-words overflow-hidden resize-none focus:outline-none bg-transparent"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 10,
              WebkitBoxOrient: "vertical",
              textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
            }}
          />
        </div>
      ) : (
        <div
          className={"flex flex-col gap-[16px] max-w-[360px] h-[350px] whitespace-normal break-words overflow-hidden"}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 10,
            WebkitBoxOrient: "vertical",
          }}
          onClick={() => setIsDescriptionEditing(true)}
        >
          <p>{taskData.description || data.description}</p>
        </div>
      )}
      <div className={"flex items-center gap-[6px]"}>
        <div
          className={`w-[20px] h-[20px] rounded-[50%] ${data.days > 0 ? "bg-[var(--primary-dark-yellow)]" : "bg-[var(--secondary-red)]"}`}></div>
        <div className={"flex mt-[6px] justify-between w-full"}>
          <div className={"flex gap-[10px] items-center"}>
            <p>{t("taskCard.remainingDays")}</p>
            {isDaysEditing ? (
              <input
                type="number"
                min={0}
                value={taskData.days}
                name="days"
                onChange={(e) => handleChange(e)}
                onBlur={() => {
                  setIsDaysEditing(false);
                  if (!taskData.days) {
                    setTaskData((prev) => ({ ...prev, days: data.days }));
                  }
                }}
                autoFocus
                className="font-[400] font-stardewSimple text-[1.6rem] align-middle w-[80px] h-fit whitespace-normal break-words overflow-hidden resize-none focus:outline-none bg-transparent"
                style={{
                  textShadow: "2px 2px 0px rgba(135,52,0,0.5)",
                }}
              />
            ) : (
              <p
                onClick={() => setIsDaysEditing(true)}
              >
                {taskData.days || data.days}
              </p>
            )}
          </div>
          <button
            className={"flex justify-between items-center bg-transparent px-[16px] py-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] transition-transform duration-50 hover:scale-103 hover:brightness-125 cursor-pointer text-[1.5rem] font-stardewSimple disabled:brightness-75 disabled:opacity-60 disabled:cursor-not-allowed"}
            style={{
              backgroundImage: "url('/default-button.png')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              textShadow: "2px 2px 0px rgba(135,52,0,0.5)"
            }}
            disabled={JSON.stringify(taskData) === JSON.stringify(data)}
            onClick={handleEditTask}
          >
            <p className={"mt-[4px]"}>{t("selectedTaskCard.saveButton")}</p>
          </button>
        </div>
      </div>
    </div>
  )
}