import {API_ENDPOINTS} from "@/api/endpoints";
import {api} from "@/api/axiosInstance";
import {GetTasksForm} from "@/api/forms/get-tasks.form";
import {CreateTaskForm} from "@/api/forms/create-task.form";
import {DeleteTaskForm} from "@/api/forms/delete-task.form";
import {GetTasksResponse} from "@/api/responses/get-tasks.response";
import {CreateTaskResponse} from "@/api/responses/create-task.response";
import {DeleteTaskResponse} from "@/api/responses/delete-task.response";
import {EditTaskForm} from "@/api/forms/edit-task.form";

export const getTasks = async ({userId, gameSaveId, plannerId}: GetTasksForm ): Promise<GetTasksResponse[]> => {
  const url = `${API_ENDPOINTS.TASKS}?userId=${userId}&gameSaveId=${gameSaveId}&plannerId=${plannerId}`;
  const response = await api.get(url);
  return response?.data;
}

export const createTask = async (createTaskForm: CreateTaskForm): Promise<CreateTaskResponse> => {
  const response = await api.post(API_ENDPOINTS.TASKS, createTaskForm);
  return response?.data;
}

export const editTask = async (editTaskForm: EditTaskForm): Promise<CreateTaskResponse> => {
  const response = await api.put(API_ENDPOINTS.TASKS, editTaskForm);
  return response?.data;
}

export const deleteTask = async (deleteTaskForm: DeleteTaskForm): Promise<DeleteTaskResponse> => {
  const response = await api.delete(API_ENDPOINTS.TASKS, { data: deleteTaskForm });
  return response?.data;
}