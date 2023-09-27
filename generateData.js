const fs = require('fs');

const data = { books: [] };
for (let i = 1; i <= 100; i++) {
  data.books.push({
    id: i,
    title: `Book ${i}`,
    author: `Author ${i}`,
    category: `Category ${i}`,
    isbn: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
    imgUrl: `https://via.placeholder.com/150/92c952?text=Book${i}`,
    createdAt: new Date().toLocaleString(),
    modifiedAt: null,
    isDeactivated: false,
  });
}

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
