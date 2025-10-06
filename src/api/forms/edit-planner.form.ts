
export interface EditPlannerForm {
  userId: string;
  gameSaveId: string;
  plannerData: PlannerDataFromEditType;
}

export interface PlannerDataFromEditType {
  id: number;
  name: string;
  description: string;
}