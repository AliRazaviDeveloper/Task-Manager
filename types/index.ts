export enum STATUS {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};
