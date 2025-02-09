jest.setTimeout(15000);  // tiempo máximo para cada prueba a 15 segundos

const request = require('supertest');
const app = require('../app');

let UrlId;
let shortUrl;
let Token;

describe('Pruebas para la API Short URL', () => {
  beforeAll(async () => {
    // Crear una URL
    const response = await request(app)
      .post('/api/urls')
      .send({ originalUrl: 'https://example2.com', maxUses: 6 });

    UrlId = response.body.id;
    shortUrl = response.body.shortUrl;

    // Obtener el token
    const tokenResponse = await request(app).get('/api/urls/token');
    Token = tokenResponse.body.token;
  });

  test('Debe crear una nueva URL corta con éxito', async () => {
    expect(UrlId).toBeDefined();
    expect(shortUrl).toBeDefined();
  });

  test('Debe redirigir a la URL original si existe', async () => {
    const response = await request(app).get(`/${shortUrl}`);
    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe('https://example2.com');
  });

  test('Debe devolver una lista de URLs más usadas', async () => {
    const response = await request(app).get('/api/urls/reports/top-urls');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Debe eliminar una URL con éxito', async () => {
    const deleteResponse = await request(app)
      .delete(`/api/urls/${UrlId}`)
      .set('Authorization', `Bearer ${Token}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty('message', 'URL eliminada con éxito.');
  });
});

