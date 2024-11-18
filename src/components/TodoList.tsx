import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import { AlertCircle } from "lucide-react";

const TodoList: React.FC = () => {
  const { todos, loading, error, addTodo, toggleTodoCompletion, deleteTodo } =
    useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      const success = await addTodo(
        newTodoTitle.trim(),
        newTodoDescription.trim()
      );
      if (success) {
        setNewTodoTitle("");
        setNewTodoDescription("");
        setIsAddingTodo(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center space-x-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!isAddingTodo ? (
        <button
          onClick={() => setIsAddingTodo(true)}
          className="w-full p-4 text-left text-gray-600 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
        >
          + Add new task
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-4 space-y-4 shadow-sm"
        >
          <div>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <textarea
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              placeholder="Task description (optional)..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddingTodo(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTodoTitle.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {todos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No tasks yet. Create one above!
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodoCompletion}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
