import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";
import {DeleteSaveForm} from "@/api/forms/delete-save.form";
import {GetPlannersForm} from "@/api/forms/get-planners.form";

export const getPlanners = async ({userId, gameSaveId}: GetPlannersForm): Promise<any> => {
  const url = `${API_ENDPOINTS.PLANNERS}?userId=${userId}&gameSaveId=${gameSaveId}`;
  const response = await api.get(url);
  return response?.data;
}

export const deleteSave = async (deleteSaveForm: DeleteSaveForm): Promise<any> => {
  const response = await api.delete(API_ENDPOINTS.SAVE, {
    data: deleteSaveForm,
  });
  return response?.data;
}