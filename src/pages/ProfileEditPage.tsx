import { TextField } from '@/components/common/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';

export const ProfileEditPage: React.FC = () => {
  const { control } = useForm<Profile>({
    defaultValues: {
      user_id: '',
      username: '',
      avatar_url: '',
    },
  });

  return (
    <div>
      <h1>ProfileEditPage</h1>
      <form>
        <TextField control={control} label="ユーザ名" name="username" type="text" required />
      </form>
    </div>
  );
};
