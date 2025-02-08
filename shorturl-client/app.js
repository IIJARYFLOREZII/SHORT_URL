const apiBaseUrl = 'http://localhost:3000/api/urls';

// listar todas las URLs 
async function fetchUrls() {
  const response = await fetch(apiBaseUrl);
  const urls = await response.json();
  renderUrls(urls, 'report-list');
}

// URLs menos usadas
async function fetchLeastUsedUrls() {
  const response = await fetch(`${apiBaseUrl}/reports/least-used`);
  const urls = await response.json();
  renderUrls(urls, 'report-list');
}

// URLs creadas en el último mes
async function fetchLastMonthUrls() {
  const response = await fetch(`${apiBaseUrl}/reports/last-month`);
  const urls = await response.json();
  renderUrls(urls, 'report-list');
}

//  URLs más usadas
async function fetchTopUrls() {
  const response = await fetch(`${apiBaseUrl}/reports/top-urls`);
  const urls = await response.json();
  renderUrls(urls, 'report-list');
}

// Buscar URLs por rango de fechas
document.getElementById('date-range-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  if (new Date(startDate) > new Date(endDate)) {
    alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
    return;
  }

  const response = await fetch(`${apiBaseUrl}/reports/fechas?startDate=${startDate}&endDate=${endDate}`);
  const urls = await response.ok ? await response.json() : [];
  
  if (urls.length > 0) {
    renderUrls(urls, 'report-list');
  } else {
    alert('No se encontraron URLs en ese rango de fechas.');
  }
});

// Crear una nueva URL corta y mostrarla en la tabla principal
document.getElementById('create-url-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const originalUrl = document.getElementById('originalUrl').value;
  const maxUses = document.getElementById('maxUses').value || 5;

  const response = await fetch(apiBaseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalUrl, maxUses })
  });

  if (response.ok) {
    const newUrl = await response.json();
    renderUrls([newUrl], 'url-list');
    alert('URL creada con éxito');
  } else {
    alert('Error al crear la URL');
  }

  e.target.reset();
});

// Eliminar URL
async function deleteUrl(id) {
    const token = localStorage.getItem('authToken');
    console.log('Token encontrado en localStorage:', token);  // Verifica el token aquí
  
    if (!token) {
      alert('Token no encontrado. Por favor, recarga la página para obtener uno nuevo.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar esta URL?')) {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 401) {
        alert('Tu token ha expirado o es inválido. Vamos a obtener un nuevo token...');
        await obtenerToken();
      } else if (response.ok) {
        alert('URL eliminada con éxito');
        fetchUrls();  // Actualizar la lista de URLs
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar la URL: ${errorData.error || 'Error desconocido'}`);
      }
    }
  }
  

  async function obtenerToken() {
    console.log('Ejecutando obtenerToken...');
    const response = await fetch('http://localhost:3000/api/urls/token');
    const data = await response.json();
  
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      console.log('Nuevo token obtenido y guardado en localStorage:', data.token);
    } else {
      console.log('Error: No se obtuvo un token.');
      alert('Error al obtener el token.');
    }
  }
  
  // Obtener el token al cargar la página
  window.onload = obtenerToken;
  
  
  
// mostrar las URLs en la tabla correspondiente
function renderUrls(urls, tableId) {
    const urlList = document.getElementById(tableId);
    urlList.innerHTML = '';  // Limpiar la tabla antes de llenarla
  
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

  


