# supabase 側のセットアップ

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
