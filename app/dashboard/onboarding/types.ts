export interface Resident {
  id: string;
  name: string;
  email: string;
  propertyId: string;
}

export interface TaskCategory {
  id: string;
  name: string;
  sortOrder: number;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskOwner = "RESIDENT" | "PM" | "SYSTEM";

export interface OnboardingTask {
  id: string;
  residentId: string;
  categoryId: string;
  title: string;
  status: TaskStatus;
  owner: TaskOwner;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: TaskCategory;
}
