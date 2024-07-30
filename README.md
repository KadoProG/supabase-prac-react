# TODO アプリを Vite + React、supabase で実装する

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.app.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# 以下、ChatGPT が提供したもの

Supabase を使って ToDo アプリを作成するためのステップを詳しく説明します。Supabase は、PostgreSQL データベース、認証、ストレージ、リアルタイム機能などを提供するフルスタックのオープンソースのバックエンドです。

### ステップ 1: Supabase プロジェクトのセットアップ

1. **Supabase にサインアップ**:
   [Supabase の公式サイト](https://supabase.io/)にアクセスし、アカウントを作成します。

2. **新しいプロジェクトを作成**:
   Supabase ダッシュボードにログインし、「New Project」ボタンをクリックして、新しいプロジェクトを作成します。プロジェクト名、データベースのパスワード、リージョンを設定します。

### ステップ 2: データベースのセットアップ

1. **データベーススキーマの定義**:
   ToDo アプリに必要なテーブルを定義します。基本的なテーブルスキーマは以下のようになります。

   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users (id),
     title TEXT NOT NULL,
     is_complete BOOLEAN DEFAULT FALSE,
     inserted_at TIMESTAMP DEFAULT NOW()
   );
   ```

   Supabase ダッシュボードの「SQL」タブから上記の SQL クエリを実行してテーブルを作成します。

### ステップ 3: 認証の設定

1. **認証プロバイダーの設定**:
   Supabase は Email/Password、OAuth などの認証をサポートしています。Supabase ダッシュボードの「Authentication」タブで、Email/Password 認証を有効にします。

### ステップ 4: フロントエンドのセットアップ

フロントエンドは React を使って構築します。まず、プロジェクトを作成します。

1. **React プロジェクトの作成**:

   ```bash
   npx create-react-app supabase-todo-app
   cd supabase-todo-app
   ```

2. **Supabase クライアントのインストール**:

   ```bash
   npm install @supabase/supabase-js
   ```

3. **Supabase クライアントの設定**:
   `src`フォルダに`supabaseClient.js`ファイルを作成し、以下のコードを追加します。

   ```javascript
   import { createClient } from "@supabase/supabase-js";

   const supabaseUrl = "https://your-supabase-url.supabase.co";
   const supabaseKey = "your-supabase-anon-key";

   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

### ステップ 5: アプリの実装

1. **ユーザー認証の実装**:
   サインアップ、ログイン、ログアウト機能を実装します。

   ```javascript
   import { supabase } from "./supabaseClient";

   // Sign Up
   const signUp = async (email, password) => {
     const { user, error } = await supabase.auth.signUp({ email, password });
     if (error) console.error("Error signing up:", error.message);
     else console.log("User signed up:", user);
   };

   // Sign In
   const signIn = async (email, password) => {
     const { user, error } = await supabase.auth.signIn({ email, password });
     if (error) console.error("Error signing in:", error.message);
     else console.log("User signed in:", user);
   };

   // Sign Out
   const signOut = async () => {
     const { error } = await supabase.auth.signOut();
     if (error) console.error("Error signing out:", error.message);
     else console.log("User signed out");
   };
   ```

2. **ToDo アイテムの CRUD 操作の実装**:

   ```javascript
   // Fetch ToDo items
   const fetchTodos = async (user_id) => {
     const { data, error } = await supabase
       .from("todos")
       .select("*")
       .eq("user_id", user_id)
       .order("inserted_at", { ascending: false });
     if (error) console.error("Error fetching todos:", error.message);
     return data;
   };

   // Add ToDo item
   const addTodo = async (title, user_id) => {
     const { data, error } = await supabase
       .from("todos")
       .insert([{ title, user_id }]);
     if (error) console.error("Error adding todo:", error.message);
     return data;
   };

   // Update ToDo item
   const updateTodo = async (id, updates) => {
     const { data, error } = await supabase
       .from("todos")
       .update(updates)
       .eq("id", id);
     if (error) console.error("Error updating todo:", error.message);
     return data;
   };

   // Delete ToDo item
   const deleteTodo = async (id) => {
     const { data, error } = await supabase.from("todos").delete().eq("id", id);
     if (error) console.error("Error deleting todo:", error.message);
     return data;
   };
   ```

3. **UI コンポーネントの作成**:
   `App.js`ファイルに基本的な UI コンポーネントを作成します。

   ```javascript
   import React, { useState, useEffect } from "react";
   import { supabase } from "./supabaseClient";

   const App = () => {
     const [todos, setTodos] = useState([]);
     const [title, setTitle] = useState("");
     const [user, setUser] = useState(null);

     useEffect(() => {
       const fetchUser = async () => {
         const session = supabase.auth.session();
         setUser(session?.user ?? null);
         if (session) {
           const todos = await fetchTodos(session.user.id);
           setTodos(todos);
         }
       };
       fetchUser();
     }, []);

     const handleAddTodo = async () => {
       const newTodo = await addTodo(title, user.id);
       setTodos([...todos, newTodo[0]]);
       setTitle("");
     };

     return (
       <div>
         <h1>Supabase ToDo App</h1>
         <input
           type="text"
           placeholder="Add new todo"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
         />
         <button onClick={handleAddTodo}>Add</button>
         <ul>
           {todos.map((todo) => (
             <li key={todo.id}>
               {todo.title} - {todo.is_complete ? "Complete" : "Incomplete"}
               <button
                 onClick={() =>
                   updateTodo(todo.id, { is_complete: !todo.is_complete })
                 }
               >
                 Toggle Complete
               </button>
               <button onClick={() => deleteTodo(todo.id)}>Delete</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default App;
   ```

これで、基本的な Supabase を使用した ToDo アプリのセットアップが完了です。さらに高度な機能を追加したり、UI を改良したりすることで、アプリをより魅力的なものにできます。
