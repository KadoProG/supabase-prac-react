import { getProfile, getSession } from '@/services/auth';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import useSWR from 'swr';

interface AuthContextType {
  status: 'unverified' | 'authenticated' | 'unauthenticated';
  session: Session | null;
  profile: Profile | null;
  mutate: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  status: 'unverified',
  session: null,
  profile: null,
  mutate: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [status, setStatus] = React.useState<AuthContextType['status']>('unverified');

  const { mutate } = useSWR('user', getSession, {
    onSuccess: async (data) => {
      if (data.data.session) {
        // 認証が通ったらProfileデータを取得
        const { data: profile, error } = await getProfile(data.data.session.user.id);
        setProfile(profile);
        if (error?.code === 'PGRST116') {
          // 対象のユーザのProfileが見つからなかった場合はコンソールに出力
          console.log('Profile not found'); // eslint-disable-line no-console
        } else {
          // その他のエラーはコンソールに出力
          console.error(error); // eslint-disable-line no-console
        }
        setSession(data.data.session);
        setStatus('authenticated');
      } else {
        setSession(null);
        setProfile(null);
        setStatus('unauthenticated');
      }
    },
    onError: (error) => {
      // eslint-disable-next-line
      console.error(error);
      setSession(null);
      setStatus('unauthenticated');
    },
  });

  return (
    <AuthContext.Provider value={{ status, session, profile, mutate }}>
      {props.children}
    </AuthContext.Provider>
  );
};
