const sqlite3 = require('sqlite3').verbose();

// Crear y conectar la base de datos
const db = new sqlite3.Database('./database/shorturl.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Crear la tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      originalUrl TEXT NOT NULL,
      shortUrl TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      useCount INTEGER DEFAULT 0,
      maxUses INTEGER DEFAULT 5  --  número máximo de usos
    )
  `);
});

module.exports = db;

