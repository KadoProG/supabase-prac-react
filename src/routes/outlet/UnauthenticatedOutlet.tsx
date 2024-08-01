import { useAuth } from '@/contexts/AuthContextProvider';
import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

/**
 * ログインしていない場合のルーティングのためのコンポーネント
 */
export const UnauthenticatedOutlet: React.FC<RouteProps> = () => {
  const { status } = useAuth();

  if (status === 'unauthenticated') {
    return <Outlet />;
  }
  return <Navigate to="/" state={{ permanent: false }} />;
};
