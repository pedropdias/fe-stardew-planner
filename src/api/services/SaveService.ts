import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";
import {DeleteSaveForm} from "@/api/forms/delete-save.form";

export const getSaves = async (userId: string): Promise<any> => {
  const response = await api.get(API_ENDPOINTS.GET_SAVES.replace(":userId", userId));
  return response?.data;
}

export const deleteSave = async (deleteSaveForm: DeleteSaveForm): Promise<any> => {
  const response = await api.delete(API_ENDPOINTS.SAVE, {
    data: deleteSaveForm,
  });
  return response?.data;
}