import {api} from "@/api/axiosInstance";
import {API_ENDPOINTS} from "@/api/endpoints";

export const getSaves = async (userId: string): Promise<any> => {
  const response = await api.get(API_ENDPOINTS.GET_SAVES.replace(":userId", userId));
  return response?.data;
}