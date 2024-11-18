// src/hooks/useTodos.ts
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { todoService } from "../services/todoService";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const { auth } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    if (auth?.data) {
      loadTodos();
    }
    console.log(auth);
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos(auth!.data.token);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const newTodo = await todoService.createTodo(
        auth!.data.token,
        title,
        description
      );
      setTodos((prev) => [...prev, newTodo]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo");
      return false;
    }
  };

  const toggleTodoCompletion = async (todo: Todo) => {
    try {
      const updatedTodo = await todoService.toggleTodo(auth!.data.token, todo);
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      return false;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(auth!.data.token, id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      return false;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodoCompletion,
    deleteTodo,
  };
};
