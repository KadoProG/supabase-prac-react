import { Button } from '@/components/common/button/Button';
import { GoogleButton } from '@/components/common/button/GoogleButton';
import { Divider } from '@/components/common/Divider';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { TextField } from '@/components/common/TextField';
import { useAuth } from '@/contexts/AuthContextProvider';
import { supabase } from '@/libs/supabaseClient';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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

  const handleGoogleLogin = React.useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return;
    }
  }, []);

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
        <Button type="submit">Login</Button>
        <Divider label="または" />
        <GoogleButton onClick={handleGoogleLogin} type="button" />
        <Divider label="または" />
        <p>
          アカウントがありませんか？
          <Link to="/new">新規登録</Link>はこちら
        </p>
      </form>
    </div>
  );
};
