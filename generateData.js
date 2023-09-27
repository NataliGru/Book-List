const fs = require('fs');

const categories = ["Fiction", "Science Fiction", "Mystery", "Romance", "Fantasy", "Thriller", "Non-Fiction", "Biography", "Self-Help", "Cooking"];

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
    imgUrl: `https://via.placeholder.com/150/92c952?text=Book${i}`,
    createdAt: new Date().toLocaleString(),
    modifiedAt: null,
    isDeactivated: false,
  });
}

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
