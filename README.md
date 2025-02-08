# Short URL API 🚀

### 📋 Descripción
Una API REST FULL para acortar URLs, con funcionalidades adicionales como reportes de las URLs más y menos usadas, límites de uso,busqueda de creacion de URLs por rango de fechas y contador de usos.

### 📦 Funcionalidades implementadas
- Crear URL corta con un límite de usos opcional o por defecto 5.
- Redirigir a la URL original usando la Url corta.
- Listar todas las URLs, URLs más usadas, menos usadas y creadas en el último mes.
- Reportes por rango de fechas.
- Autenticación mediante tokens para proteger eliminacion de URL.

### ⚙️ Configuración y ejecución
1. Clona el repositorio:
   ```bash
   git clone https://github.com/IIJARYFLOREZII/SHORT_URL.git
2. Instala las dependencias:
   npm install
3. Inicializar el servidor:
   node app.js
4. Inicializar la base de datos
   node iniciodb.js
5. El servidor estará disponible en http://localhost:3000.

