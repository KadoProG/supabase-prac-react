import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NewUserPage } from '@/pages/NewUserPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const MyRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/new" element={<NewUserPage />} />
    </Routes>
  </BrowserRouter>
);
