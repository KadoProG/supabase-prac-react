import { useTodoList } from '@/hooks/todo/useTodoList';
import React from 'react';

export const TodoList: React.FC = () => {
  const {
    title,
    setTitle,
    isLoading,
    isHandleLoading,
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodoList();

  return (
    <div>
      <h1>Supabase ToDo App</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo} disabled={isHandleLoading}>
        Add
      </button>
      {isLoading && <p>Loading...</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.is_complete ? 'Complete' : 'Incomplete'}
            <button onClick={() => handleUpdateTodo(todo.id)} disabled={isHandleLoading}>
              Toggle Complete
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)} disabled={isHandleLoading}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
