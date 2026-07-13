const params = new URLSearchParams(window.location.search);
const idFuncion = params.get('id_funcion');
let funcionActual = null;

const seleccionados = [];

async function iniciarAsientos() {
    funcionActual = await obtenerFuncion(idFuncion);
    if (!funcionActual){
        document.querySelector('.titulo_pelicula_pequeño').textContent = 'Funcion no encontrada';
        return;
    }
    const pelicula = await obtenerPelicula(funcionActual.peliculaId);
    document.querySelector('.titulo_pelicula_pequeño').textContent = pelicula.titulo;
    document.querySelector('.subtitulo_sala_hora').textContent = `${funcionActual.sala} - ${funcionActual.hora} hs`;

    dibujarGrilla();
    actualizarResumen();

}

function dibujarGrilla() {
    const contenedor = document.querySelector('.contenedor_grilla_asientos');

    let html = '<div class="numeros_columnas"><span></span>';
    for (let c = 1; c <= COLUMNAS; c++) {
        html += `<span>${c}</span>`;
    }
    html += '<span></span></div>';

    FILAS.forEach(function(fila) {
        html += `<div class="fila_asientos"><span class="letra_fila">${fila}</span>`;
        for (let c = 1; c <= COLUMNAS; c++) {
            const codigo = `${fila}${c}`;
            const ocupado = funcionActual.asientosOcupados.includes(codigo);
            if (ocupado) {
                html += `<button class="asiento ocupado" data-asiento="${codigo}" disabled></button>`;
            } else {
                html += `<button class="asiento disponible" data-asiento="${codigo}"></button>`;
            }
        }
        html += `<span class="letra_fila">${fila}</span></div>`;
    });

    contenedor.innerHTML = html;

    document.querySelectorAll('.asiento.disponible').forEach(function(boton) {
        boton.addEventListener('click', function() {
            alternarAsiento(boton);
        });
    });
}

function alternarAsiento(boton) {
    const codigo = boton.dataset.asiento;

    if (boton.classList.contains('seleccionado')) {
        boton.classList.remove('seleccionado');
        seleccionados.splice(seleccionados.indexOf(codigo), 1);
    } else {
        boton.classList.add('seleccionado');
        seleccionados.push(codigo);
    }

    actualizarResumen();
}

function actualizarResumen() {
    const cantidad = seleccionados.length;

    document.getElementById('contador_entradas').textContent = cantidad;
    document.getElementById('monto_total').textContent = (cantidad * funcionActual.precio).toFixed(2);


    const texto = document.getElementById('asientos_seleccionados');
    if (cantidad === 0) {
        texto.textContent = 'Selecciona tus asientos';
    } else {
        texto.textContent = seleccionados.join(', ');
    }
}

const btnContinuar = document.getElementById('btn_continuar_compra');
btnContinuar.addEventListener('click', function(evento) {
    if (seleccionados.length === 0) {

        evento.preventDefault();
        return;
    }

    guardarPedido({
        funcionId: funcionActual.id,
        pelicula: document.querySelector('.titulo_pelicula_pequeño').textContent,
        sala: funcionActual.sala,
        hora: funcionActual.hora,
        asientos: seleccionados,
        precioUnitario: funcionActual.precio,
        total: seleccionados.length * funcionActual.precio
    });
});

iniciarAsientos();