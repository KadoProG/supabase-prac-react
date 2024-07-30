import { Home } from "@/pages/Home";
import { LoginForm } from "@/pages/LoginForm";
import { NewUserForm } from "@/pages/NewUserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/new" element={<NewUserForm />} />
      </Routes>
    </BrowserRouter>
  );
};
