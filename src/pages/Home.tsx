import React from "react";
import { User } from "@supabase/supabase-js";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  Todo,
  updateTodo,
} from "@/services/todo";
import { supabase } from "@/libs/supabaseClient";

export const Home = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [title, setTitle] = React.useState("");
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      setUser(session?.user ?? null);
      if (session) {
        const todos = await fetchTodos(session.user.id);
        if (todos !== null) setTodos(todos);
      }
    };
    fetchUser();
  }, []);

  const handleAddTodo = async () => {
    if (user === null) return;
    const newTodo = await addTodo(title, user.id);
    if (newTodo === null) return;
    setTodos([...todos, newTodo[0]]);
    setTitle("");
  };

  return (
    <div>
      <h1>Supabase ToDo App</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.is_complete ? "Complete" : "Incomplete"}
            <button
              onClick={() =>
                updateTodo(todo.id, {
                  ...todo,
                  is_complete: !todo.is_complete,
                })
              }
            >
              Toggle Complete
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
