export interface Task {
  id: string;
  title: string;
  description: string | null;
  created_by: string,
  created_at: Date
  updated_by: string | null,
  updated_at: Date | null
}
