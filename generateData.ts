import { writeFileSync } from 'fs';

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string;
  modifiedAt: string;
  active: boolean;
}


const categories = [
  'Fiction',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Fantasy',
  'Thriller',
  'Non-Fiction',
  'Biography',
  'Self-Help',
  'Cooking',
];

let currentISBN = 1;
const generateISBN = () => {
  const ISBN = `${currentISBN}`.padStart(10, '0');
  currentISBN++;
  return ISBN;
};

const data = { books: [] as Book[]};
for (let i = 1; i <= 99; i++) {
  const categoryIndex = Math.floor((i - 1) / 10);
  const category = categories[categoryIndex];

  data.books.push({
    id: i,
    title: `Book ${i}`,
    author: `Author ${i}`,
    category,
    isbn: generateISBN(),
    createdAt: new Date().toLocaleString(),
    modifiedAt: '---',
    active: false,
  });
}

writeFileSync('db.json', JSON.stringify(data, null, 2));
