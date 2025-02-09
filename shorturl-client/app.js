const apiBaseUrl = 'http://localhost:3000/api/urls';

// Obtener un nuevo token
async function obtenerToken() {
  const response = await fetch(`${apiBaseUrl}/token`);
  const data = await response.json();

  if (data.token) {
    localStorage.setItem('authToken', data.token);
    console.log('Nuevo token obtenido:', data.token);
  } else {
    alert('Error al obtener el token.');
  }
}

// Eliminar una URL con manejo de token dinámico
async function deleteUrl(id) {
  let token = localStorage.getItem('authToken');
  if (!token) {
    await obtenerToken();
    token = localStorage.getItem('authToken');
  }

  const response = await fetch(`${apiBaseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  if (response.status === 401) {
    alert('Token expirado. Generando uno nuevo...');
    await obtenerToken();
    return deleteUrl(id); // Reintenta la eliminación
  }

  if (response.ok) {
    alert('URL eliminada con éxito');
    fetchUrls();  // Actualiza la lista de URLs
  } else {
    alert('Error al eliminar la URL');
  }
}

// Listar todas las URLs
async function fetchUrls() {
  const response = await fetch(apiBaseUrl);
  const urls = await response.json();
  renderUrls(urls, 'report-list');
}

// Renderizar las URLs en la tabla
function renderUrls(urls, tableId) {
  const urlList = document.getElementById(tableId);
  urlList.innerHTML = '';

  urls.forEach(url => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${url.id}</td>
      <td>${url.originalUrl}</td>
      <td><a href="http://localhost:3000/${url.shortUrl}" target="_blank">${url.shortUrl}</a></td>
      <td>${url.useCount || 0}</td>
      <td>${url.maxUses || 'Sin límite'}</td>
      <td>${new Date(url.createdAt).toLocaleString()}</td>
      <td><button class="button delete" onclick="deleteUrl(${url.id})">Eliminar</button></td>
    `;
    urlList.appendChild(row);
  });
}

// Mostrar solo la sección seleccionada
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });

  const selectedSection = document.getElementById(sectionId);
  selectedSection.classList.remove('hidden');
}

// Obtener el token al cargar la página
window.onload = obtenerToken;
  


