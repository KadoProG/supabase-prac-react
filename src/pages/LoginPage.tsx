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
    <div
      style={{
        height: '100svh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading && <LoadingWithMessage message="ログイン中..." />}
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          margin: 16,
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
