import { create } from "zustand";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type CreateTodo = {
  title: string;
};

type TodoStore = {
  todos: Todo[];
  fetchTodos: () => void;
  addTodo: (todo: CreateTodo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
};

export const useStore = create<TodoStore>((set) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      const response = await fetch("/api/todos");
      const todos = await response.json();
      set({ todos });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },
  addTodo: async (todo) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const createdTodo = await response.json();
      set((state) => ({ todos: [...state.todos, createdTodo] }));
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  },
  updateTodo: async (updatedTodo) => {
    try {
      const response = await fetch(`/api/todos/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const updatedItem = await response.json();
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedItem.id ? updatedItem : todo
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },
  deleteTodo: async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },
}));
