import {SaveDataType} from "@/types/saveType";

export interface CreateDemoSaveForm {
  userId: string;
  email: string;
  gameSaveId: string;
  saveData: RequiredSaveData & SaveDataType;
}

interface RequiredSaveData {
  saveName: string;
}