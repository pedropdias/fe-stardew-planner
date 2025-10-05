import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";
import {DeleteSaveForm} from "@/api/forms/delete-save.form";
import {SaveType} from "@/types/saveType";
import {DeleteSaveResponse} from "@/api/responses/delete-save.response";

export const getSaves = async (userId: string): Promise<SaveType[]> => {
  const response = await api.get(API_ENDPOINTS.GET_SAVES.replace(":userId", userId));
  return response?.data;
}

export const deleteSave = async (deleteSaveForm: DeleteSaveForm): Promise<DeleteSaveResponse> => {
  const response = await api.delete(API_ENDPOINTS.SAVE, {
    data: deleteSaveForm,
  });
  return response?.data;
}