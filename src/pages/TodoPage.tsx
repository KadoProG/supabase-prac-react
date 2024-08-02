import React from 'react';
import { TodoList } from '@/components/todo/TodoList';
import { Header } from '@/components/common/layouts/Header';

export const TodoPage: React.FC = () => (
  <>
    <Header />
    <TodoList />
  </>
);
