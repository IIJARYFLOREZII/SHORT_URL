# Short URL API 🚀

## 📋 Descripción
Una API REST para acortar URLs, con funcionalidades avanzadas como estadísticas de uso, reportes por rango de fechas y autenticación por token. Incluye una interfaz frontend para interactuar con la API y documentación generada con Swagger.

## 🛠️ Funcionalidades Implementadas
- Crear URLs cortas con un número máximo de usos configurables.
- Listar todas las URLs almacenadas.
- Generar reportes de las URLs más usadas, menos usadas y creadas en el último mes.
- Reporte por rango de fechas.
- Autenticación por token para proteger ciertas operaciones.
- Interfaz frontend para probar la API.
- Documentación con Swagger (`http://localhost:3000/api-docs`).

## ⚙️ Configuración del Proyecto

### **Requisitos**
- Node.js (v14 o superior)
- SQLite

### **Pasos para Configuración**
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/IIJARYFLOREZII/SHORT_URL.git
   ```

2. Entrar en la carpeta del proyecto:
   ```bash
   cd SHORT_URL
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Inicializar la base de datos:
   ```bash
   node iniciodb.js
   ```

5. Ejecutar el servidor:
   ```bash
   node app.js
   ```

6. Abrir en navegador: [http://localhost:3000](http://localhost:3000)



## 🔗 Documentación de Endpoints
La documentación completa de la API está disponible Swagger:

URL: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)



## 🧪 Pruebas Unitarias
se incluye pruebas unitarias con **Jest** para verificar la funcionalidad de la API.

### ⚙️ Ejecutar pruebas:
```bash
npm test
```

### 🔍 Cobertura de Pruebas:
Las pruebas verifican las siguientes funcionalidades:
- **Creación de URL** (`POST /api/urls`)
- **Redirección de URL** (`GET /:shortUrl`)
- **Reporte de URLs más usadas** (`GET /api/urls/reports/top-urls`)
- **Eliminación de URL protegida por token** (`DELETE /api/urls/:id`)

Si todas las pruebas pasan correctamente, tendra este resultado como:
```
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        ~30s
```



## 🖥️ Interfaz Frontend
El proyecto incluye una interfaz frontend desarrollada con **TailwindCSS** para probar las funcionalidades de la API. Accede a la interfaz en:  
[http://localhost:3000/shorturl.html](http://localhost:3000/shorturl.html)
 
