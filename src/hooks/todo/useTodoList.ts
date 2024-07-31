import { useAuth } from '@/contexts/AuthContextProvider';
import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/services/todo';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export const useTodoList = () => {
  const { control, handleSubmit, reset } = useForm<{ title: string }>({
    defaultValues: {
      title: '',
    },
  });
  const { session } = useAuth();
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
    handleSubmit(async (formData) => {
      const { title } = formData;
      setIsHandleLoading(true);
      await addTodo(title, session.user.id);
      await mutate();
      setIsHandleLoading(false);
      reset();
    })();
  }, [session, mutate, reset, handleSubmit]);

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
    control,
    isLoading,
    isHandleLoading,
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
