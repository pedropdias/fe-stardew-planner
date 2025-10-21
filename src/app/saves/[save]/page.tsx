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
import {createPlanner, deletePlanner, editPlanner} from "@/api/services/PlannerService";
import {PlannerDataType} from "@/api/forms/create-planner.form";
import {SaveType, TaskType} from "@/types/saveType";
import SaveInfoHeader from "@/components/saveInfoHeader/saveInfoHeader";
import PlannerBoard from "@/components/plannerBoard/plannerBoard";
import EditPlannerModal from "@/components/editModal/editModal";
import {DeletePlannerForm} from "@/api/forms/delete-planner.form";
import {DeletePlannerResponse} from "@/api/responses/delete-planner.response";
import CreateTaskModal from "@/components/createTaskModal/createTaskModal";
import {createTask, deleteTask} from "@/api/services/TaskService";
import {CreateTaskType} from "@/types/createTaskType";
import ConfirmModal from "@/components/confirmModal/confirmModal";
import {DeleteTaskForm} from "@/api/forms/delete-task.form";
import {DeleteTaskResponse} from "@/api/responses/delete-task.response";

export default function SavePage() {
  const {
    user,
    authLoading,
    t,
    fetchPlanners,
    fetchSaves,
    fetchTasks,
    loadingGetPlanners,
    selectedPlanner,
    setSelectedPlanner,
    saves,
    loadingGetTasks,
    setSelectedTask,
    selectedTask,
  } = useAppContextProvider()
  const router = useRouter();
  const params = useParams();
  const rawGameSaveIdParam = params.save;
  const gameSaveId = Array.isArray(rawGameSaveIdParam) ? rawGameSaveIdParam[0] : rawGameSaveIdParam;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [currentSave, setCurrentSave] = useState<SaveType | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login")
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user || !gameSaveId) return;
    fetchPlanners({userId: user.id, gameSaveId});
    fetchSaves(user.id);
  }, [user]);

  useEffect(() => {
    if (!saves) return;
    setCurrentSave(saves.find((save) => save.game_save_id === gameSaveId) ?? null)
  }, [saves]);

  const {
    execute: executeCreatePlanner,
    loading: loadingCreatePlanner,
    error: errorCreatePlanner,
  } = useFetch(createPlanner)

  const {
    execute: executeEditPlanner,
    loading: loadingEditPlanner,
    error: errorEditPlanner,
  } = useFetch(editPlanner)

  const {
    execute: executeDeletePlanner,
    loading: loadingDeletePlanner,
    error: errorDeletePlanner,
  } = useFetch(deletePlanner)

  const {
    execute: executeCreateTask,
    loading: loadingCreateTask,
    error: errorCreateTask,
  } = useFetch(createTask)

  const {
    execute: executeDeleteTask,
    loading: loadingDeleteTask,
    error: errorDeleteTask,
  } = useFetch(deleteTask)

  const handleCreatePlanner = async (plannerData: PlannerDataType): Promise<PlannerType | undefined> => {
    if (!user || !gameSaveId) return;
    try {
      const payload = {
        userId: user.id,
        gameSaveId: gameSaveId,
        plannerData,
      };

      const response = await executeCreatePlanner(payload);

      await fetchPlanners({userId: user.id, gameSaveId})
      setShowModal(false);

      if (!response) throw errorCreatePlanner;

      setSelectedPlanner(response?.data);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPlanner = async (plannerData: PlannerType): Promise<PlannerType | undefined> => {
    if (!user || !gameSaveId) return;
    try {
      const payload = {
        userId: user.id,
        gameSaveId: gameSaveId,
        plannerData,
      };

      const response = await executeEditPlanner(payload);

      await fetchPlanners({userId: user.id, gameSaveId})
      setShowEditModal(false);

      if (!response) throw errorEditPlanner;

      setSelectedPlanner(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePlanner = async (deletePlannerForm: DeletePlannerForm): Promise<DeletePlannerResponse | undefined> => {
    if (!user || !gameSaveId) return;
    try {
      const response = await executeDeletePlanner(deletePlannerForm);

      await fetchPlanners({userId: user.id, gameSaveId})
      setShowEditModal(false);

      if (!response) throw errorDeletePlanner;

      setSelectedPlanner(null);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskType): Promise<TaskType | undefined> => {
    if (!user || !gameSaveId || !selectedPlanner) return;
    try {
      const payload = {
        userId: user.id,
        gameSaveId: gameSaveId,
        taskData: {
          plannerId: taskData.plannerId,
          name: taskData.name,
          description: taskData.description,
          days: taskData.days,
        },
      };

      const response = await executeCreateTask(payload);

      await fetchPlanners({userId: user.id, gameSaveId});
      await fetchTasks({userId: user.id, gameSaveId, plannerId: selectedPlanner.id.toString()});
      setShowModal(false);

      if (!response) throw errorCreateTask;

      setSelectedTask(response)
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (): Promise<DeleteTaskResponse | undefined> => {
    if (!user || !gameSaveId || !selectedPlanner || !selectedTask) return;
    try {
      const deleteTaskForm = {
        userId: user.id,
        gameSaveId: gameSaveId,
        plannerId: selectedPlanner.id,
        taskId: selectedTask.id,
      } as DeleteTaskForm;

      const response = await executeDeleteTask(deleteTaskForm);

      await fetchPlanners({userId: user.id, gameSaveId})
      await fetchTasks({userId: user.id, gameSaveId, plannerId: selectedPlanner.id.toString()});
      setShowDeleteTaskModal(false);

      if (!response) throw errorDeleteTask;

      setSelectedTask(null);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("saves:", saves);
  // console.log("currentSave:", currentSave);

  return (
    <>
      {(loadingGetPlanners || loadingGetTasks) && (
        <>
          <div
            className="w-[100vw] h-[100vh] fixed flex justify-center items-center inset-0 bg-[rgba(0,0,0,0.25)] backdrop-blur-sm z-[999] transition-transform"
            style={{backdropFilter: "blur(3px)"}}
          >
            <Spinner/>
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
      {showEditModal && selectedPlanner && gameSaveId && (
        <>
          <div className="w-[100vw] h-[100vh] fixed inset-0 bg-[#000000B3] backdrop-blur-sm z-[999]"
               style={{backdropFilter: "blur(3px)"}}
          />
          <EditPlannerModal
            gameSaveId={gameSaveId}
            plannerData={selectedPlanner}
            loading={loadingEditPlanner}
            onConfirm={handleEditPlanner}
            onCancel={() => setShowEditModal(false)}
            onDelete={handleDeletePlanner}
          />
        </>
      )}
      {showCreateTaskModal && selectedPlanner && gameSaveId && (
        <>
          <div className="w-[100vw] h-[100vh] fixed inset-0 bg-[#000000B3] backdrop-blur-sm z-[999]"
               style={{backdropFilter: "blur(3px)"}}
          />
          <CreateTaskModal
            loading={loadingCreateTask}
            onConfirm={handleCreateTask}
            onCancel={() => setShowCreateTaskModal(false)}
            setShowCreateTaskModal={setShowCreateTaskModal}
          />
        </>
      )}
      {showDeleteTaskModal && selectedPlanner && gameSaveId && (
        <>
          <div className="w-[100vw] h-[100vh] fixed inset-0 bg-[#000000B3] backdrop-blur-sm z-[999]"
               style={{backdropFilter: "blur(3px)"}}
          />
          <ConfirmModal
            title={t("deleteTaskModal.title")}
            description={t("deleteTaskModal.description")}
            confirmText={t("deleteTaskModal.delete")}
            cancelText={t("deleteTaskModal.cancel")}
            onCancel={() => setShowDeleteTaskModal(false)}
            onConfirm={handleDeleteTask}
            loading={loadingDeleteTask}
          />
        </>
      )

      }
      <div
        className="min-h-[100vh] max-w-[100vw] overflow-x-hidden bg-cover bg-center flex flex-col items-center pb-[100px] gap-[2.5vh] select-none"
        style={{backgroundImage: "url('/sky-wallpaper-blur.png')"}}>
        <Header/>
        <div
          className="flex justify-start w-full ml-[20px]"
        >
          <Image
            src={"/back-button.png"}
            alt={"back-button"}
            width={134}
            height={55}
            className={"transition-transform duration-50 hover:scale-105 hover:brightness-125 cursor-pointer"}
            onClick={() => router.push("/saves")}
          />
        </div>
        <div className="flex justify-start w-full h-full gap-[100px] px-[24px] py-[8px]">
          <PlannersSideBar setShowModal={setShowModal}/>
          <div className={"flex flex-col items-start gap-[72px] w-full max-w-[2200px] mr-[56px]"}>
            {currentSave && <SaveInfoHeader save={currentSave}/>}
            {selectedPlanner && <PlannerBoard planner={selectedPlanner} setShowEditModal={setShowEditModal}
                                              setShowCreateTaskModal={setShowCreateTaskModal}
                                              setShowDeleteTaskModal={setShowDeleteTaskModal}
            />}
          </div>
        </div>
      </div>
    </>
  )
}