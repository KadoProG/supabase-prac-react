import styles from '@/components/common/layouts/Header.module.scss';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { useAuth } from '@/contexts/AuthContextProvider';
import { signOut } from '@/services/auth';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { session, profile, status, mutate } = useAuth();

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
      <div className={styles.header__right}>
        {status === 'unverified' && <LoadingWithMessage message="ユーザ認証を実施しています..." />}
        {session ? (
          <div className={styles.header__right__profile}>
            <p>{profile?.username}</p>
            <img src={profile?.avatar_url} alt={profile?.username} />
          </div>
        ) : (
          <p>未ログイン</p>
        )}
        <Link to={session ? '' : '/login'} onClick={handleSignout}>
          {session ? 'ログアウト' : 'ログイン'}
        </Link>
      </div>
    </header>
  );
};
