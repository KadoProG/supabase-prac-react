import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { TextField } from '@/components/common/TextField';
import { useAuth } from '@/contexts/AuthContextProvider';
import { supabase } from '@/libs/supabaseClient';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

export const LoginPage: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useAuth();

  const { control, handleSubmit } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      setIsLoading(true);
      setError(null);
      const { email, password } = data;
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setError(null);
        // eslint-disable-next-line no-console
        console.log('Logged in user:', user);
      }
      mutate();
      setIsLoading(false);
    })();
  };

  return (
    <div>
      {isLoading && <LoadingWithMessage message="ログイン中..." />}
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <TextField name="email" control={control} required label="メールアドレス" type="email" />
        </div>
        <div>
          <TextField
            name="password"
            control={control}
            required
            label="パスワード"
            type="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
