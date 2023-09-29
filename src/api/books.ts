import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const getBooks = () => {
  return client.get<Book[]>(`/books`);
};

export function addBook(title: string) {
  return client.post<Book>('/books', {
    title,
    completed: false,
  });
}

export function deleteBook(bookId: number) {
  return client.delete(`/books/${bookId}`);
}

export function updateBook({ id, ...bookData }: Book) {

  return client.patch<Book>(`/books/${id}`, bookData);
}
