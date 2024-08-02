import { Header } from '@/components/common/layouts/Header';
import React from 'react';
import { Link } from 'react-router-dom';

const links: { label: string; url: string }[] = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'ToDo画面',
    url: '/todo',
  },
  {
    label: 'ログイン画面',
    url: '/login',
  },
  {
    label: '新規ユーザ登録画面',
    url: '/new',
  },
];

export const HomePage: React.FC = () => (
  <>
    <Header />
    <h1>Home</h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 8,
      }}
    >
      {links.map((link) => (
        <div
          style={{
            backgroundColor: '#f5f5f5',
          }}
          key={link.url}
        >
          <Link
            to={link.url}
            style={{
              display: 'block',
              padding: 8,
            }}
          >
            {link.label}
            <span style={{ background: '#fff', padding: 4 }}>({link.url})</span>
          </Link>
        </div>
      ))}
    </div>
  </>
);
