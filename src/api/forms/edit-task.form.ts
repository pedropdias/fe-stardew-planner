export interface EditTaskForm {
  userId: string;
  gameSaveId: string;
  "taskData": {
    "id": number;
    "plannerId": number,
    "name": string,
    "description": string,
    "days": number,
  }
}