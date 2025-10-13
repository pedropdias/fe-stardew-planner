export interface CreateTaskForm {
  userId: string;
  gameSaveId: string;
  "taskData": {
    "plannerId": number,
    "name": string,
    "description": string,
    "days": number,
  }
}