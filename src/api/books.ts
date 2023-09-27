import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

// export const getBooks = (userId: number) => {
//   return client.get<Book[]>(`/Books?userId=${userId}`);
// };

// export function addBook(title: string) {
//   return client.post<Book>('/Books', {
//     title,
//     completed: false,
//     userId: USER_ID,
//   });
// }

// export function deleteBook(BookId: number) {
//   return client.delete(`/Books/${BookId}`);
// }

// export function updateBook({ id, ...BookData }: Book) {
//   return client.patch<Book>(`/Books/${id}`, BookData);
// }
