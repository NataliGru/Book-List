import React from 'react';
import BookTable from '../components/BookTable/BookTable';
import FilterSelector from '../components/FilterSelector/FilterSelector';
import { Footer } from '../components/Footer/Footer';
import { Container } from '../components/Container/Container';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <FilterSelector />
      <BookTable />
      <Footer />
    </Container>
  );
};
