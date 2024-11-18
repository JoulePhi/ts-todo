import React, { useState } from "react";
import { Todo } from "../types/todo";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = async () => {
    await onToggle(todo);
  };

  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`border-b transition-colors ${
        todo.done ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={handleToggle}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-1">
            <span
              className={`text-gray-800 font-medium ${
                todo.done ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <div className="text-sm text-gray-500">
              Created: {formatDate(todo.created_at)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-12 pb-4 text-gray-600">
          <p className="whitespace-pre-line">{todo.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            Last updated: {formatDate(todo.updated_at)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
