import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { useAuth } from '@/contexts/AuthContextProvider';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NewUserPage } from '@/pages/NewUserPage';
import { ProfileEditPage } from '@/pages/ProfileEditPage';
import { TodoDetailPage } from '@/pages/TodoDetailPage';
import { TodoPage } from '@/pages/TodoPage';
import { AuthenticatedOutlet } from '@/routes/outlet/AuthenticatedOutlet';
import { UnauthenticatedOutlet } from '@/routes/outlet/UnauthenticatedOutlet';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const MyRouter: React.FC = () => {
  const { status } = useAuth();

  return status === 'unverified' ? (
    <LoadingWithMessage message="ユーザ認証を実施しています..." />
  ) : (
    <BrowserRouter>
      <Routes>
        {/* 誰でも閲覧できるルーティング */}
        <Route path="/" element={<HomePage />} />

        <Route element={<AuthenticatedOutlet />}>
          {/* ログイン済みのルーティング */}
          <Route path="/todo/:todo_id" element={<TodoDetailPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
        </Route>

        <Route element={<UnauthenticatedOutlet />}>
          {/* 未ログインのルーティング */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new" element={<NewUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
