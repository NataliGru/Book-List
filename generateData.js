const fs = require('fs');

let currentISBN = 1;
const generateISBN = () => {
  const ISBN = `${currentISBN}`.padStart(10, '0');
  currentISBN++;
  return ISBN;
};

const data = { books: [] };
for (let i = 1; i <= 99; i++) {
  data.books.push({
    id: i,
    title: `Book ${i}`,
    author: `Author ${i}`,
    category: `Category ${i}`,
    isbn: generateISBN(),
    imgUrl: `https://via.placeholder.com/150/92c952?text=Book${i}`,
    createdAt: new Date().toLocaleString(),
    modifiedAt: null,
    isDeactivated: false,
  });
}

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
