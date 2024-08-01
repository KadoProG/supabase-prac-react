import { useAuth } from '@/contexts/AuthContextProvider';
import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

/**
 * ログイン済みの場合のルーティングのためのコンポーネント
 */
export const AuthenticatedOutlet: React.FC<RouteProps> = () => {
  const { status } = useAuth();

  if (status === 'authenticated') {
    return <Outlet />;
  }
  return <Navigate to="/" state={{ permanent: false }} />;
};
