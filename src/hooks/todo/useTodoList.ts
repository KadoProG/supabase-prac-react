import { useAuth } from '@/contexts/AuthContextProvider';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/services/todo';
import React from 'react';
import useSWR from 'swr';

export const useTodoList = () => {
  const { session } = useAuth();
  const [title, setTitle] = React.useState('');
  const [isHandleLoading, setIsHandleLoading] = React.useState<boolean>(false);

  const { isLoading, data, mutate } = useSWR(
    `todos-${session?.user.id}`,
    async () => {
      if (session) return fetchTodos(session?.user.id);
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: (error) => {
        // eslint-disable-next-line
        console.error(error);
      },
    }
  );

  const todos = React.useMemo(() => data ?? [], [data]);

  const handleAddTodo = React.useCallback(async () => {
    if (!session) return;
    setIsHandleLoading(true);
    await addTodo(title, session.user.id);
    await mutate();
    setIsHandleLoading(false);
    setTitle('');
  }, [session, title, mutate]);

  const handleUpdateTodo = React.useCallback(
    async (id: Todo['id']) => {
      if (!session) return;
      const todo = todos.find((todo) => todo.id === id);
      if (!todo) return;

      const newTodo = { ...todo, is_complete: !todo.is_complete };

      setIsHandleLoading(true);
      await updateTodo(id, newTodo);
      await mutate();
      setIsHandleLoading(false);
    },
    [session, todos, mutate]
  );

  const handleDeleteTodo = React.useCallback(
    async (id: Todo['id']) => {
      if (!session) return;
      setIsHandleLoading(true);
      await deleteTodo(id);
      await mutate();
      setIsHandleLoading(false);
    },
    [session, mutate]
  );

  return {
    title,
    setTitle,
    isLoading,
    isHandleLoading,
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
