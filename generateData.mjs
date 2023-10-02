import { writeFileSync } from 'fs';
import moment from 'moment';

const currentTime = moment().format('DD MMMM YYYY, h:mmA');


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

const data = { books: [] };
for (let i = 1; i <= 99; i++) {
  const categoryIndex = Math.floor((i - 1) / 10);
  const category = categories[categoryIndex];

  data.books.push({
    id: i,
    title: `Book ${i}`,
    author: `Author ${i}`,
    category,
    isbn: generateISBN(),
    createdAt: currentTime,
    modifiedAt: '---',
    active: false,
  });
}

writeFileSync('db.json', JSON.stringify(data, null, 2));
