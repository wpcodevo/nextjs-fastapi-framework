import { useStore } from "@/store";
import { useState } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const updateTodo = useStore((state) => state.updateTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);

  const handleToggleComplete = () => {
    setLoading(true);
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
    setLoading(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteTodo(todo.id);
    setLoading(false);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <span
        className={`text-gray-700 flex-1 ${
          todo.completed ? "line-through" : ""
        }`}
        onClick={handleToggleComplete}
      >
        {todo.title}
      </span>
      <button
        disabled={loading}
        className={`px-2 py-1 text-white rounded ${
          loading ? "bg-gray-400" : "bg-red-500"
        }`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
