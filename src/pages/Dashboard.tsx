import React, { useEffect, useMemo, useState } from 'react';
import BookTable from '../components/BookTable/BookTable';
import { Footer } from '../components/Footer/Footer';
import { Container } from '../components/Container/Container';
import { useSearchParams } from 'react-router-dom';
import { getBooks } from '../api/books';
import { getFilteredData } from '../utils/getFilteredData';
import { Book } from '../types/Book';
import { Filter } from '../types/Filter';
import FilterSelector from '../components/FilterSelector/FilterSelector';

export const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const filter: Filter = (searchParams.get('filter') as Filter) || Filter.All;

  useEffect(() => {
    setIsLoading(true);

    getBooks()
      .then(setBooks)
      .catch((error) => error)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleBooks = useMemo(() => {
    const filteredBooks = getFilteredData({
      books,
      filter,
    });

    return filteredBooks;
  }, [books, filter]);

  return (
    <Container>
      <FilterSelector />
      <BookTable books={visibleBooks} />
    </Container>
  );
};
