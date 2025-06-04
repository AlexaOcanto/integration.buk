const cardsPerPage = 6;
let currentPage = 1;
let filteredManuales = manuales;  // Usamos los manuales desde data.js

// Generar tarjetas dinámicamente
function generateCards(page) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Ordena primero por activos (true) y luego por inactivos (false)
    const sortedManuales = filteredManuales.slice().sort((a, b) => b.activo - a.activo);

    const paginatedManuales = sortedManuales.slice(start, end);

    paginatedManuales.forEach(manual => {
        // Verifica si la descripción es mayor de 50 caracteres y la corta
        let descripcionCorta = manual.descripcion;
        if (manual.descripcion.length > 50) {
            descripcionCorta = manual.descripcion.substring(0, 90) + '...';
        }

        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.innerHTML = `
            <div class="card ${manual.activo ? 'card-active' : 'card-inactive'}" style="cursor: ${manual.activo ? 'pointer' : 'not-allowed'};">
                <div class="card-body">
                    <h5 class="card-title" style='color: #2f4daa;'>${manual.nombre}</h5>
                    <p class="card-text" style='color: #2f4daa;'>Tipo: ${manual.tipo}</p>
                    <p class="card-text" style='color: #2f4daa;'>Fecha Actualización: ${manual.fecha}</p>
                    <p class="card-text" style='color: #2f4daa;'>${descripcionCorta}</p> <!-- Descripción recortada -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="check${manual.nombre}" ${manual.activo ? 'checked' : ''} disabled>
                        <label class="form-check-label" style='color: #2f4daa;' for="check${manual.nombre}">
                            ${manual.activo ? 'Activo' : 'Inactivo'}
                        </label>
                    </div>
                </div>
            </div>`;

        // Solo agregar el evento click si el manual está activo
        if (manual.activo) {
            card.querySelector('.card').addEventListener('click', () => {
                window.open(manual.url, '_blank');
            });
        }

        cardContainer.appendChild(card); // Añadir la tarjeta al contenedor
    });
}




// Generar la paginación
function generatePagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredManuales.length / cardsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = `
            <li class="page-item mx-1 ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>`;
        paginationContainer.innerHTML += pageItem;
    }
}


// Cambiar página
function changePage(page) {
    currentPage = page;
    generateCards(currentPage);
    generatePagination();
}

// Filtrar tarjetas
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    filteredManuales = manuales.filter(manual => {
        return (
            manual.tipo.toLowerCase().includes(searchValue) ||
            manual.nombre.toLowerCase().includes(searchValue) ||
            manual.fecha.includes(searchValue) ||
            manual.descripcion.toLowerCase().includes(searchValue)
        );
    });
    currentPage = 1;
    generateCards(currentPage);
    generatePagination();
});

// Inicializar
generateCards(currentPage);
generatePagination();

