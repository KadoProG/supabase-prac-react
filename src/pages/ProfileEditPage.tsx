import { Button } from '@/components/common/button/Button';
import { Header } from '@/components/common/layouts/Header';
import { LoadingWithMessage } from '@/components/common/LoadingWithMessage';
import { TextField } from '@/components/common/TextField';
import { useAuth } from '@/contexts/AuthContextProvider';
import { upsertProfile } from '@/services/auth';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

export const ProfileEditPage: React.FC = () => {
  const { session, profile, mutate } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { control, reset, handleSubmit, setValue } = useForm<Profile>({
    defaultValues: {
      user_id: '',
      username: '',
      avatar_url: '',
    },
  });

  const handleFormSubmit = React.useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(async (data) => {
        setIsLoading(true);
        await upsertProfile(data);
        setIsLoading(false);
        mutate();
      })();
    },
    [handleSubmit, mutate]
  );

  React.useEffect(() => {
    reset({ ...profile });
    setValue('user_id', session?.user.id ?? '');
  }, [profile, reset, setValue, session]);

  return (
    <>
      {isLoading && <LoadingWithMessage message="データを保存しています..." />}
      <Header />
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <h1>ProfileEditPage</h1>
        <TextField control={control} label="ユーザ名" name="username" type="text" required />
        <TextField control={control} label="アバターURL" name="avatar_url" type="text" required />
        <Button type="submit">更新</Button>
      </form>
    </>
  );
};
