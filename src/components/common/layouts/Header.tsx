import styles from '@/components/common/layouts/Header.module.scss';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { useAuth } from '@/contexts/AuthContextProvider';

export const Header: React.FC = () => {
  const { session, status } = useAuth();

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Header</p>
      <div>
        {status === 'unverified' && <LoadingWithMessage message="ユーザ認証を実施しています..." />}
        <p>{session ? 'ログイン済み' : '未ログイン'}</p>
        <a href={session ? '/logout' : '/login'}>{session ? 'ログアウト' : 'ログイン'}</a>
      </div>
    </header>
  );
};
