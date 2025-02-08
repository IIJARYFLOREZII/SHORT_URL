const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/shorturl.db');


db.serialize(() => {
  console.log('poblando la base de datos...');


  const insert = db.prepare(`
    INSERT INTO urls (originalUrl, shortUrl, createdAt, useCount, maxUses)
    VALUES (?, ?, ?, ?, ?)
  `);

  const sampleData = [
    ['https://example.com', 'abc123', '2025-02-01 10:00:00', 1, 5],
    ['https://google.com', 'xyz789', '2025-02-02 11:30:00', 2, 10],
    ['https://github.com', 'gh1234', '2025-02-03 14:15:00', 5, 15],
    ['https://openai.com', 'openai1', '2025-02-04 16:45:00', 3, 20]
  ];

  sampleData.forEach(row => insert.run(...row));

  insert.finalize();
  console.log('Datos de ejemplo insertados correctamente n.n');
  
  db.close();
});
