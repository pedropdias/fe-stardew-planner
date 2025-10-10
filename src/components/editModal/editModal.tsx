"use client";

import { PlannerType } from "@/types/PlannerType";
import { useState } from "react";
import { useAppContextProvider } from "@/providers/AppContextProvider";
import {PlannerDataFromEditType} from "@/api/forms/edit-planner.form";
import {DeletePlannerForm} from "@/api/forms/delete-planner.form";
import {DeletePlannerResponse} from "@/api/responses/delete-planner.response";
import ConfirmModal from "@/components/confirmModal/confirmModal";

interface EditPlannerModalProps {
  gameSaveId: string;
  plannerData: PlannerType
  loading?: boolean;
  onConfirm: (plannerData: PlannerDataFromEditType) => Promise<PlannerType | undefined>;
  onCancel: () => void;
  onDelete: (deletePlannerForm: DeletePlannerForm) => Promise<DeletePlannerResponse | undefined>;
}

export default function EditPlannerModal({
                                             gameSaveId,
                                             plannerData,
                                             loading = false,
                                             onConfirm,
                                             onCancel,
                                             onDelete
                                           }: EditPlannerModalProps) {
  const { t, user } = useAppContextProvider();

  const [plannerDataEdited, setPlannerDataEdited] = useState<PlannerDataFromEditType>(plannerData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!user) {
    throw new Error("EditPlannerModal requires a logged-in user.");
  }

  const deletePlannerFormObj = {
    userId: user.id,
    gameSaveId: gameSaveId,
    plannerId: plannerData.id
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlannerDataEdited({
      ...plannerDataEdited,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!plannerDataEdited.name.trim() || !plannerDataEdited.description.trim()) {
      return;
    }

    await onConfirm(plannerDataEdited);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await onDelete(deletePlannerFormObj);
    } finally {
      setDeleteLoading(false);
      setShowConfirmModal(false);
    }
  };

  const isDisabled =
    loading || !plannerDataEdited.name.trim() || !plannerDataEdited.description.trim();

  return (
    <>
      <div
        className="w-[100vw] h-[100vh] fixed inset-0 z-[9999] flex items-center justify-center select-none font-stardewSimple"
         style={{
           backdropFilter: showConfirmModal ? "blur(6px)" : "none",
           backgroundColor: showConfirmModal ? "rgba(0, 0, 0, 0.4)" : "transparent",
           transition: "all 0.25s ease",
         }}
      >
        <div
          className="bg-[var(--card-background)] border-2 border-[var(--card-background-3)] rounded-[12px] shadow-lg p-[24px] w-[420px] max-w-[90%] flex flex-col gap-6 text-center"
           style={{
             filter: showConfirmModal ? "blur(4px) brightness(0.7)" : "none",
             transition: "filter 0.25s ease",
           }}
        >
          <h2 className="text-[1.6rem] mb-[16px]">
            {t("editPlannerModal.title")}
          </h2>
          <p className="text-[1rem] mb-[16px]">
            {t("editPlannerModal.description")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder={t("editPlannerModal.namePlaceHolder")}
              value={plannerDataEdited.name}
              onChange={handleChange}
              required
              className="w-full rounded-[16px] p-[10px] mb-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--card-background-3)] font-stardewSimple"
            />

            <textarea
              name="description"
              placeholder={t("editPlannerModal.descriptionPlaceHolder")}
              value={plannerDataEdited.description}
              onChange={handleChange}
              rows={4}
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
                {t("editPlannerModal.cancel")}
              </button>

              <button
                type="submit"
                disabled={isDisabled}
                className="cursor-pointer p-[10px] bg-[#14b358] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform flex items-center justify-center gap-[8px] disabled:opacity-50 text-[#FFFFFF]"
              >
                {loading && (
                  <span className="w-[10px] h-[10px] border-2 border-[#FFF] border-t-transparent rounded-full animate-spin"></span>
                )}
                {t("editPlannerModal.create")}
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="cursor-pointer w-fit py-[10px] px-[19px] mt-[10px] bg-[var(--tertiary-red)] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform flex items-center justify-center gap-[8px] disabled:opacity-50 text-[#FFFFFF]"
              >
                {t("editPlannerModal.delete")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          title={t("editPlannerModal.confirmDeleteTitle")}
          description={t("editPlannerModal.confirmDeleteDescription")}
          confirmText={t("editPlannerModal.confirm")}
          cancelText={t("editPlannerModal.cancel")}
          loading={deleteLoading}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}
