import React from 'react';
import { Header } from '@/components/common/layouts/Header';
import { TodoDetail } from '@/components/todo/TodoDetail';

export const TodoDetailPage: React.FC = () => (
  <>
    <Header />
    <TodoDetail />
  </>
);
