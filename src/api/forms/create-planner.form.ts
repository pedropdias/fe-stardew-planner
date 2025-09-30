export interface CreatePlannerForm {
  userId: string;
  gameSaveId: string;
  plannerData: PlannerDataType;
}

export interface PlannerDataType {
  name: string;
  description: string;
}