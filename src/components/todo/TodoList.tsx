import { Button } from '@/components/common/button/Button';
import { DeleteButton } from '@/components/common/button/DeleteButton';
import { Skeleton } from '@/components/common/Skeleton';
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
    <div style={{ padding: 8 }}>
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
          <Button onClick={handleAddTodo} disabled={isHandleLoading}>
            Add
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexFlow: 'column', gap: 8 }}>
        {isLoading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {todos.map((todo) => (
          <div key={todo.id} style={{ display: 'flex', gap: 4 }}>
            {todo.title} - {todo.is_complete ? 'Complete' : 'Incomplete'}
            <Button onClick={() => handleUpdateTodo(todo.id)} disabled={isHandleLoading}>
              {todo.is_complete ? 'Incomplete' : 'Complete'}
            </Button>
            <DeleteButton onClick={() => handleDeleteTodo(todo.id)} disabled={isHandleLoading} />
          </div>
        ))}
      </div>
    </div>
  );
};
