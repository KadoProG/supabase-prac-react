import { Skeleton } from '@/components/common/Skeleton';
import { fetchTodoById, isPostgrestError } from '@/services/todo';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const TodoDetail: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(false);
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const { todo_id } = useParams();

  React.useEffect(() => {
    if (todo_id) {
      setIsLoading(true);
      fetchTodoById(todo_id)
        .then((data) => {
          setTodo(data);
        })
        .catch((error) => {
          if (isPostgrestError(error) && error.code === 'PGRST116') {
            // 一つもTodoが見つからなかった場合
            setIsNotFound(true);
          } else {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [todo_id]);

  return (
    <div>
      <h1>Todo Detail</h1>
      <div style={{ display: 'flex', flexFlow: 'column', gap: 8, padding: 8 }}>
        {isLoading && (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
        {todo && (
          <>
            <p>Todo ID： {todo?.title}</p>
            <p>状態：{todo?.is_complete ? '完了' : '未完了'}</p>
          </>
        )}
        {
          // 一つもTodoが見つからなかった場合
          isNotFound && <p>Not Found</p>
        }
      </div>
      <Link to="/todo">前のページに戻る</Link>
    </div>
  );
};
