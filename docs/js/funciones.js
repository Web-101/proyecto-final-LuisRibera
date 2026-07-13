async function mostrarDetalles(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const pelicula = await obtenerPelicula(id);

    if (!pelicula) {
        document.querySelector('.titulo_pelicula_detalle').textContent = 'Pelicula no encontrada';
        return;
    }
    document.querySelector('.img_fondo_desenfocada').src = pelicula.poster;
    document.querySelector('.img_poster_pequeño').src = pelicula.poster;
    document.querySelector('.titulo_pelicula_detalle').textContent = pelicula.titulo;
    document.querySelector('.texto_sinopsis').textContent = pelicula.sinopsis;

    const funciones = await obtenerFuncionesDePelicula(id);
    const lista = document.querySelector('.lista_funciones');

    lista.innerHTML = funciones.map(funcion => {
        return `<a href="asientos_3.html?id_funcion=${funcion.id}" class="enlace_funcion">
            <article class="tarjeta_funcion">
                <div class="detalle_tiempo_sala">
                    <span class="hora_funcion">${funcion.hora}</span>
                    <span class="sala_funcion">${funcion.sala}</span>
                </div>
                <span class="precio_funcion">${bs(funcion.precio)}</span>
            </article>
        </a>
        `;
    }).join('');
}
mostrarDetalles();