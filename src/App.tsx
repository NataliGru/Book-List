import React from 'react';
import { Container } from './components/Container/Container';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div>
      <Header />

      <Container>
        <Outlet />

      </Container>

      <Footer />
    </div>
  );
}
