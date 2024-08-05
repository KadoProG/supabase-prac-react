import { supabase } from '@/libs/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';

// Fetch ToDo items
export const fetchTodos = async (user_id: string): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user_id)
    .order('inserted_at', { ascending: false });
  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching todos:', error.message);
    return [];
  }
  return data;
};

// Fetch a single ToDo item by ID
export const fetchTodoById = async (todo_id: string): Promise<Todo | null> => {
  const { data, error } = await supabase.from('todos').select('*').eq('id', todo_id).single();
  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching todo:', error.message);
    throw error;
    return null;
  }
  return data;
};

// Add ToDo item
export const addTodo = async (title: string, user_id: string) => {
  const { error } = await supabase.from('todos').insert([{ title, user_id }]);
  // eslint-disable-next-line no-console
  if (error) console.error('Error adding todo:', error.message);
};

// Update ToDo item
export const updateTodo = async (id: string, updates: Todo) => {
  const { data, error } = await supabase.from('todos').update(updates).eq('id', id);
  // eslint-disable-next-line no-console
  if (error) console.error('Error updating todo:', error.message);
  return data;
};

// Delete ToDo item
export const deleteTodo = async (id: string) => {
  const { data, error } = await supabase.from('todos').delete().eq('id', id);
  // eslint-disable-next-line no-console
  if (error) console.error('Error deleting todo:', error.message);
  return data;
};

// PostgrestError型ガード
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPostgrestError = (error: any): error is PostgrestError =>
  error && typeof error === 'object' && 'message' in error && 'details' in error;
