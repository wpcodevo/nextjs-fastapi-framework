import { useStore } from "@/store";
import { useState } from "react";

export default function TodoForm() {
  const addTodo = useStore((state) => state.addTodo);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleCreateTodo = async () => {
    if (newTodo.length === 0) return alert("Todo input must not be empty");
    try {
      setLoading(true);
      const todo = { title: newTodo };
      await addTodo(todo);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
      <button
        disabled={loading}
        className={`px-2 py-1 text-white rounded ${
          loading ? "bg-gray-400" : "bg-green-500"
        }`}
        onClick={handleCreateTodo}
      >
        Add
      </button>
    </div>
  );
}
