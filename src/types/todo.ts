// src/types/todo.ts
export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: Todo[];
}
