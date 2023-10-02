import React from 'react';
import { Book } from '../types/Book';
import { Filter } from '../types/Filter';

type Props = {
  books: Book[];
  filter: Filter;
};

export const getFilteredData = ({ books, filter }: Props) => {
  if (filter === 'active') {
    return books.filter(({ active }) => active === true);
  }

  if (filter === 'deactivated') {
    return books.filter(({ active }) => active === false);
  }

  return books;
};
