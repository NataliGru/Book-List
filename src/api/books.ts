import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';
import moment from 'moment';

const createdAt = moment().format('DD MMMM YYYY, h:mmA');

export const getBooks = () => {
  return client.get<Book[]>(`/books`);
};

export function addBook(bookData: {
  title: string;
  author: string;
  category: string;
  isbn: string;
}) {

  return client.post<Book>('/books', {
    title: bookData.title,
    author: bookData.author,
    category: bookData.category,
    isbn: bookData.isbn,
    modifiedAt: '---',
    createdAt,
    completed: false,
  });
}

export function deleteBook(bookId: number) {
  return client.delete(`/books/${bookId}`);
}

export function updateBook({ id, ...bookData }: Book) {

  return client.patch<Book>(`/books/${id}`, bookData);
}
