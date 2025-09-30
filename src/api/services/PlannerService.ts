import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";
import {GetPlannersForm} from "@/api/forms/get-planners.form";
import {CreatePlannerForm} from "@/api/forms/create-planner.form";
import {GetPlannersResponse} from "@/api/responses/get-planners.response";
import {CreatePlannerResponse} from "@/api/responses/create-planner.response";

export const getPlanners = async ({userId, gameSaveId}: GetPlannersForm): Promise<GetPlannersResponse[]> => {
  const url = `${API_ENDPOINTS.PLANNERS}?userId=${userId}&gameSaveId=${gameSaveId}`;
  const response = await api.get(url);
  return response?.data;
}

export const createPlanner = async (createPlannerForm: CreatePlannerForm): Promise<CreatePlannerResponse> => {
  const response = await api.post(API_ENDPOINTS.PLANNERS, createPlannerForm);
  return response?.data;
}