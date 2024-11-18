// src/services/todoService.ts
import { Todo, ApiResponse } from "../types/todo";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

export const todoService = {
  // Get all todos
  async getAllTodos(token: string): Promise<Todo[]> {
    const response = await axios.get(`${API_BASE_URL}/api/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch tasks");
    }

    const data: ApiResponse = await response.data;
    return data.data ?? [];
  },

  // Create new todo
  async createTodo(
    token: string,
    title: string,
    description: string = ""
  ): Promise<Todo> {
    const response = await axios.post(
      `${API_BASE_URL}/api/tasks`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to create task");
    }

    const data = await response.data;
    return data.data;
  },

  // Toggle todo completion
  async toggleTodo(token: string, todo: Todo): Promise<Todo> {
    todo.done = !todo.done;
    const response = await axios.put(
      `${API_BASE_URL}/api/tasks/${todo.id}`,
      todo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update task");
    }

    return response.data.data;
  },

  // Delete todo
  async deleteTodo(token: string, id: number): Promise<void> {
    const response = await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete task");
    }
  },
};
