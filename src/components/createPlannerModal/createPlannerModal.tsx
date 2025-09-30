"use client";

import { PlannerDataType } from "@/api/forms/create-planner.form";
import { PlannerType } from "@/types/PlannerType";
import { useEffect, useState } from "react";
import { useAppContextProvider } from "@/providers/AppContextProvider";

interface CreatePlannerModalProps {
  loading?: boolean;
  onConfirm: (plannerData: PlannerDataType) => Promise<PlannerType | undefined>;
  onCancel: () => void;
}

export default function CreatePlannerModal({
                                             loading = false,
                                             onConfirm,
                                             onCancel,
                                           }: CreatePlannerModalProps) {
  const { t } = useAppContextProvider();

  const [plannerData, setPlannerData] = useState<PlannerDataType>({
    name: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlannerData({
      ...plannerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!plannerData.name.trim() || !plannerData.description.trim()) {
      return; // impede envio se os campos estiverem vazios
    }

    await onConfirm(plannerData);
  };

  useEffect(() => {
    console.log("plannerData:", plannerData);
  }, [plannerData]);

  const isDisabled =
    loading || !plannerData.name.trim() || !plannerData.description.trim();

  return (
    <div className="w-[100vw] h-[100vh] fixed inset-0 z-[9999] flex items-center justify-center select-none font-stardewSimple">
      <div className="bg-[var(--card-background)] border-2 border-[var(--card-background-3)] rounded-[12px] shadow-lg p-[24px] w-[420px] max-w-[90%] flex flex-col gap-6 text-center">
        <h2 className="text-[1.6rem] mb-[16px]">
          {t("createPlannerModal.title")}
        </h2>
        <p className="text-[1rem] mb-[16px]">
          {t("createPlannerModal.description")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("createPlannerModal.namePlaceHolder")}
            value={plannerData.name}
            onChange={handleChange}
            required
            className="w-full rounded-[16px] p-[10px] mb-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--card-background-3)] font-stardewSimple"
          />

          <textarea
            name="description"
            placeholder={t("createPlannerModal.descriptionPlaceHolder")}
            value={plannerData.description}
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
              {t("createPlannerModal.cancel")}
            </button>

            <button
              type="submit"
              disabled={isDisabled}
              className="cursor-pointer p-[10px] bg-[#14b358] border-2 border-[var(--card-background-4)] rounded-[4px] font-stardewSimple hover:scale-105 transition-transform flex items-center justify-center gap-[8px] disabled:opacity-50 text-[#FFFFFF]"
            >
              {loading && (
                <span className="w-[10px] h-[10px] border-2 border-[#FFF] border-t-transparent rounded-full animate-spin"></span>
              )}
              {t("createPlannerModal.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
