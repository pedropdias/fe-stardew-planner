"use client";

import {useState} from "react";
import {useAppContextProvider} from "@/providers/AppContextProvider";
import {TaskType} from "@/types/saveType";
import {CreateTaskType} from "@/types/createTaskType";
import Spinner from "@/components/loadingSpinner/loadingSpinner";

interface CreateTaskModalProps {
  loading?: boolean;
  onConfirm: (taskForm: CreateTaskType) => Promise<TaskType | undefined>;
  onCancel: () => void;
  setShowCreateTaskModal: (showCreateTaskModal: boolean) => void;
}

export default function CreateTaskModal({
                                          loading = false,
                                          onConfirm,
                                          onCancel,
                                          setShowCreateTaskModal,
                                        }: CreateTaskModalProps) {
  const {t, user, selectedPlanner} = useAppContextProvider();

  if (!user) {
    throw new Error("CreateTaskModal requires a logged-in user.");
  }

  if (!selectedPlanner) {
    throw new Error("CreateTaskModal requires to have a selected planner.");
  }

  const [taskDataEdited, setTaskDataEdited] = useState<CreateTaskType>({
    plannerId: selectedPlanner.id,
    name: "",
    description: "",
    days: 0,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTaskDataEdited({
      ...taskDataEdited,
      [name]: name === "days" ? Number(value) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!taskDataEdited.name.trim() || !taskDataEdited.description.trim()) {
      return;
    }

    await onConfirm(taskDataEdited);
    setShowCreateTaskModal(false);
  };

  const isDisabled =
    loading || !taskDataEdited.name.trim() || !taskDataEdited.description.trim();

  return (
    <div
      className="w-[100vw] h-[100vh] fixed inset-0 z-[9999] flex items-center justify-center select-none font-stardewSimple">
      <div
        className="bg-[var(--card-background)] border-2 border-[var(--card-background-3)] rounded-[12px] shadow-lg p-[24px] w-[420px] max-w-[90%] flex flex-col gap-6 text-center">
        <h2 className="text-[1.6rem] mb-[16px]">
          {t("createTaskModal.title")}
        </h2>
        <p className="text-[1rem] mb-[16px]">
          {t("createTaskModal.description")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("createTaskModal.namePlaceHolder")}
            value={taskDataEdited.name}
            onChange={handleChange}
            required
            className="w-full rounded-[16px] p-[10px] mb-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--card-background-3)] font-stardewSimple"
          />

          <textarea
            name="description"
            placeholder={t("createTaskModal.descriptionPlaceHolder")}
            value={taskDataEdited.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full rounded-[16px] p-[10px] mb-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--card-background-3)] font-stardewSimple"
          />

          <input
            type="number"
            name="days"
            placeholder={t("createTaskModal.daysPlaceHolder")}
            value={taskDataEdited.days}
            min={0}
            onChange={handleChange}
            required
            className="w-full rounded-[16px] p-[10px] mb-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--card-background-3)] font-stardewSimple"
          />

          <div className="flex justify-center gap-[16px] mt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="cursor-pointer p-[10px] bg-[#FFF] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform disabled:opacity-50"
            >
              {t("createTaskModal.cancel")}
            </button>

            <button
              type="submit"
              disabled={isDisabled}
              className="cursor-pointer p-[10px] bg-[#14b358] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform flex items-center justify-center gap-[8px] disabled:opacity-50 text-[#FFFFFF]"
            >
              {loading && (
                <Spinner size={16}/>
              )}
              {t("createTaskModal.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
