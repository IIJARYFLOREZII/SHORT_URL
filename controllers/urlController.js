const db = require('../database/db');
const { nanoid } = require('nanoid');  // nanoid para generar identificadores únicos

// Crear y guardar una URL corta
const urlCorta = (req, res) => {
  const { originalUrl, maxUses = 5 } = req.body;

  // Validación: Verificar si se envió la URL
  if (!originalUrl) {
    return res.status(400).json({ error: 'La URL original es obligatoria.' });
  }

  
  const shortUrl = nanoid(6);

  console.log('Agregando en la base de datos:');
  console.log('originalUrl:', originalUrl);
  console.log('shortUrl:', shortUrl);

  // Insertar en la base de datos
  db.run(
    `INSERT INTO urls (originalUrl, shortUrl, maxUses) VALUES (?, ?, ?)`,
    [originalUrl, shortUrl, maxUses],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar la URL en la base de datos.' });
      }
  
      // para obtener el campo de fecha de creacion
      db.get(`SELECT * FROM urls WHERE id = ?`, [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error al recuperar la URL creada.' });
        }
        res.status(201).json(row);
      });
    }
  );
  
};

// Redirigir a la URL original
const redirigirUrl = (req, res) => {
  const { shortUrl } = req.params;

  // Buscar la URL en la base de datos
  db.get(`SELECT * FROM urls WHERE shortUrl = ?`, [shortUrl], (err, row) => {
    if (err) {
      console.error('Error consultando la base de datos:', err.message);
      return res.status(500).json({ error: 'Error al buscar la URL en la base de datos.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'URL no encontrada' });
    }
     // Verificar si ha alcanzado el número máximo de usos
     if (row.useCount >= row.maxUses) {
      return res.status(403).json({ error: 'Esta URL ha alcanzado el número máximo de usos y ha expirado T.T' });
    }

    // Incrementar el contador de usos
    db.run(`UPDATE urls SET useCount = useCount + 1 WHERE id = ?`, [row.id], (updateErr) => {
      if (updateErr) {
        console.error('Error incrementando el contador:', updateErr.message);
      }
      res.redirect(row.originalUrl);
    });
  });
};

// Listar todas las URLs
const listar = (req, res) => {
  db.all(`SELECT * FROM urls`, (err, rows) => {
    if (err) {
      console.error('Error al obtener las URLs:', err.message);
      return res.status(500).json({ error: 'Error al obtener las URLs' });
    }
    res.json(rows);
  });
}
  // eliminar una URL 
  const eliminarUrl = (req, res) => {
    const { id } = req.params;
  
    db.run(`DELETE FROM urls WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error('Error al eliminar la URL:', err.message);
        return res.status(500).json({ error: 'Error al eliminar la URL.' });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ error: 'URL no encontrada.' });
      }
  
      res.status(200).json({ message: 'URL eliminada con éxito.' });
    });
  };
 
  // URLs mas usadas, ordenadas de mayor a menor  
const urlsMasUsadas = (req, res) => {
  db.all(`SELECT * FROM urls ORDER BY useCount DESC`, (err, rows) => {
    if (err) {
      console.error('Error al obtener las URLs más usadas:', err.message);
      return res.status(500).json({ error: 'Error al obtener las URLs más usadas.' });
    }
    res.json(rows);
  });
};

// URLs menos usadas, ordenadas de menor a mayor 
const urlsMenosUsadas = (req, res) => {
  db.all(`SELECT * FROM urls ORDER BY useCount ASC`, (err, rows) => {
    if (err) {
      console.error('Error al obtener las URLs menos usadas:', err.message);
      return res.status(500).json({ error: 'Error al obtener el reporte de URLs menos usadas.' });
    }
    res.json(rows);
  });
};


// URLs utilizadas en un rango de fechas
const ReportePorFechas = (req, res) => {
  const { startDate, endDate } = req.query;

  // Validar que las fechas sean enviadas
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Debes proporcionar fecha inicio y fecha fin " });
  }

  // Consulta SQL para filtrar ignorando la hora
  const query = `
  SELECT * FROM urls 
  WHERE DATE(createdAt) BETWEEN DATE(?) AND DATE(?) 
  ORDER BY createdAt DESC
`;

db.all(query, [startDate, endDate], (err, rows) => {
  if (err) {
    console.error("Error al obtener el reporte por fechas:", err.message);
    return res.status(500).json({ error: "Error al obtener el reporte por fechas." });
  }
  res.json(rows);
});
};

// URLs creadas en el último mes
const urlsUltimoMes = (req, res) => {
  const query = `
    SELECT * FROM urls 
    WHERE createdAt >= datetime('now', '-30 days') 
    ORDER BY createdAt DESC
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener las URLs del último mes:', err.message);
      return res.status(500).json({ error: 'Error al obtener el reporte del último mes.' });
    }
    res.json(rows);
  });
};


module.exports = { urlCorta, redirigirUrl, listar, eliminarUrl,ReportePorFechas,urlsMasUsadas,urlsMenosUsadas,urlsUltimoMes};






