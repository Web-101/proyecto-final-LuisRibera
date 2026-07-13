let destacadas = [];
let indiceActual = 0;

async function iniciarCarrusel() {
    const datos = await obtenerCartelera();
    destacadas = datos.peliculas.slice(0, 3);
    mostrarDestacada();
    setInterval(siguienteDestacada, 4000);
}

function mostrarDestacada() {
    const pelicula = destacadas[indiceActual];

    document.querySelector('.img_destacada').src = pelicula.poster;
    document.querySelector('.img_destacada').alt = `Banner de ${pelicula.titulo}`;
    document.querySelector('.titulo_destacado').textContent = pelicula.titulo;

    const contenedorPuntos = document.querySelector('.animacion_carrusel');
    contenedorPuntos.innerHTML = destacadas.map(function(peli, i) {
        const clase = i === indiceActual ? 'punto_carrusel_activo' : 'punto_carrusel';
        return `<button class="${clase}" aria-label="Ver ${peli.titulo}" data-indice="${i}"></button>`;
    }).join('');

    document.querySelectorAll('.animacion_carrusel button').forEach(function(boton) {
        boton.addEventListener('click', function() {
            indiceActual = Number(boton.dataset.indice);
            mostrarDestacada();
        });
    });
}

function siguienteDestacada() {
    indiceActual = (indiceActual + 1) % destacadas.length;
    mostrarDestacada();
}

iniciarCarrusel();