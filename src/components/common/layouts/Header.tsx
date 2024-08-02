import styles from '@/components/common/layouts/Header.module.scss';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { useAuth } from '@/contexts/AuthContextProvider';
import { signOut } from '@/services/auth';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { session, status, mutate } = useAuth();

  const handleSignout = React.useCallback(
    // eslint-disable-next-line
    async (e: any) => {
      if (!session) return;
      e.preventDefault();
      await signOut();
      mutate();
    },
    [mutate, session]
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Header
      </Link>
      <div>
        {status === 'unverified' && <LoadingWithMessage message="ユーザ認証を実施しています..." />}
        <p>{session ? 'ログイン済み' : '未ログイン'}</p>
        <a href={session ? '' : '/login'} onClick={handleSignout}>
          {session ? 'ログアウト' : 'ログイン'}
        </a>
      </div>
    </header>
  );
};
