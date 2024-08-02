interface Todo {
  id?: string;
  title: string;
  user_id: string;
  is_complete: boolean;
  inserted_at: string;
}

interface Profile {
  id?: string;
  user_id: string;
  username: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}
