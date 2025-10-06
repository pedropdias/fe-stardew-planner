import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";
import {GetPlannersForm} from "@/api/forms/get-planners.form";
import {CreatePlannerForm} from "@/api/forms/create-planner.form";
import {GetPlannersResponse} from "@/api/responses/get-planners.response";
import {CreatePlannerResponse} from "@/api/responses/create-planner.response";
import {EditPlannerForm, PlannerDataFromEditType} from "@/api/forms/edit-planner.form";
import {DeletePlannerForm} from "@/api/forms/delete-planner.form";
import {DeletePlannerResponse} from "@/api/responses/delete-planner.response";

export const getPlanners = async ({userId, gameSaveId}: GetPlannersForm): Promise<GetPlannersResponse[]> => {
  const url = `${API_ENDPOINTS.PLANNERS}?userId=${userId}&gameSaveId=${gameSaveId}`;
  const response = await api.get(url);
  return response?.data;
}

export const createPlanner = async (createPlannerForm: CreatePlannerForm): Promise<CreatePlannerResponse> => {
  const response = await api.post(API_ENDPOINTS.PLANNERS, createPlannerForm);
  return response?.data;
}

export const editPlanner = async (editPlannerForm: EditPlannerForm): Promise<PlannerDataFromEditType> => {
  const response = await api.put(API_ENDPOINTS.PLANNERS, editPlannerForm);
  return response?.data;
}

export const deletePlanner = async (deletePlannerForm: DeletePlannerForm): Promise<DeletePlannerResponse> => {
  const response = await api.delete(API_ENDPOINTS.PLANNERS, { data: deletePlannerForm });
  return response?.data;
}