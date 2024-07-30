import { supabase } from "./supabaseClient";

export interface Todo {
  id: string;
  title: string;
  user_id: string;
  is_complete: boolean;
  inserted_at: string;
}

// Fetch ToDo items
export const fetchTodos = async (user_id: string): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user_id)
    .order("inserted_at", { ascending: false });
  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }
  return data;
};

// Add ToDo item
export const addTodo = async (title: string, user_id: string) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, user_id }]);
  if (error) console.error("Error adding todo:", error.message);
  return data;
};

// Update ToDo item
export const updateTodo = async (id: string, updates: Todo) => {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id);
  if (error) console.error("Error updating todo:", error.message);
  return data;
};

// Delete ToDo item
export const deleteTodo = async (id: string) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  if (error) console.error("Error deleting todo:", error.message);
  return data;
};
