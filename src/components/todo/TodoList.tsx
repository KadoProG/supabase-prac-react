import { TextField } from '@/components/common/TextField';
import { useTodoList } from '@/hooks/todo/useTodoList';
import React from 'react';

export const TodoList: React.FC = () => {
  const {
    control,
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
      <div style={{ display: 'flex', width: '100%' }}>
        <TextField
          control={control}
          name="title"
          placeholder="Add new todo"
          required
          style={{ flex: 1 }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={handleAddTodo} disabled={isHandleLoading}>
            Add
          </button>
        </div>
      </div>
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
