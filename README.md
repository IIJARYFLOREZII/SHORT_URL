
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
1. Clona el repositorio:  
   ```bash  
   git clone https://github.com/IIJARYFLOREZII/SHORT_URL.git  
   ```  

2. Entra en la carpeta del proyecto:  
   ```bash  
   cd SHORT_URL  
   ```  

3. Instala las dependencias:  
   ```bash  
   npm install  
   ```  

4. Inicializa la base de datos:  
   ```bash  
   node iniciodb.js  
   ```  

5. Ejecuta el servidor:  
   ```bash  
   node app.js  
   ```  

6. Abre en tu navegador: `http://localhost:3000`  

## 🔗 Documentación de Endpoints  
La documentación completa de la API está disponible en la interfaz Swagger:  
**URL:** `http://localhost:3000/api-docs`  

## 🧪 Pruebas  
El proyecto incluye pruebas unitarias con **Jest**.  

### **Ejecutar pruebas:**  
```bash  
npm test  
```  

### **Cobertura de pruebas:**  
- Creación de URL (`POST /api/urls`)  
- Redirección (`GET /:shortUrl`)  
- Reportes (`GET /api/urls/reports`)  

## 🖥️ Interfaz Frontend  
El proyecto incluye una interfaz frontend desarrollada con **TailwindCSS**, disponible en:  
**`http://localhost:3000/shorturl.html`**  


