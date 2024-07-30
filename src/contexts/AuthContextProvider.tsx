import { getSession } from '@/services/auth';
import { Session } from '@supabase/supabase-js';
import React from 'react';
import useSWR from 'swr';

interface AuthContextType {
  status: 'unverified' | 'authenticated' | 'unauthenticated';
  session: Session | null;
  mutate: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  status: 'unverified',
  session: null,
  mutate: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [status, setStatus] = React.useState<AuthContextType['status']>('unverified');

  const { mutate } = useSWR('user', getSession, {
    onSuccess: (data) => {
      setSession(data.data.session);
      setStatus('authenticated');
    },
    onError: (error) => {
      // eslint-disable-next-line
      console.error(error);
      setSession(null);
      setStatus('unauthenticated');
    },
  });

  return (
    <AuthContext.Provider value={{ status, session, mutate }}>
      {props.children}
    </AuthContext.Provider>
  );
};
