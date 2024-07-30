import { AuthContextProvider } from '@/contexts/AuthContextProvider';
import { MyRouter } from '@/routes/Router';

export const App: React.FC = () => (
  <AuthContextProvider>
    <MyRouter />
  </AuthContextProvider>
);
