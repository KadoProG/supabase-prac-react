CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users (id),
  title TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  inserted_at TIMESTAMP DEFAULT NOW()
);
