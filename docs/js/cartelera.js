async function mostrarPeliculas() {
    const datos = await obtenerCartelera();
    const contenedor = document.getElementById('contenedor_peliculas');
    contenedor.innerHTML = datos.peliculas.map(function(pelicula) {
        return `
        <a href="funciones_2.html?id=${pelicula.id}" class="enlace_pelicula">
        <article class="tarjeta_pelicula">
        <figure class="contenedor_poster">
            <img src="${pelicula.poster}" alt="${pelicula.titulo}">
        </figure>
        <h3 class="nombre_pelicula">${pelicula.titulo}</h3>
        </article>
        </a>
        `

    }).join('');
}
mostrarPeliculas();