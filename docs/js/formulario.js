const pedido = leerPedido();

function mostrarResumen() {
    document.getElementById('resumen_pelicula').textContent = pedido.pelicula;
    document.getElementById('resumen_funcion').textContent = `${pedido.sala} · ${pedido.hora}`;
    document.getElementById('resumen_asientos').textContent = pedido.asientos.join(', ');
    document.getElementById('texto_cantidad_resumen').textContent = `Total (${pedido.asientos.length} entradas)`;
    document.getElementById('precio_final_resumen').textContent = bs(pedido.total);
    document.getElementById('btn_procesar_compra').textContent = `Comprar - ${bs(pedido.total)}`;
}

const formulario = document.getElementById('form_datos_usuario');
formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    guardarPedido({
        nombre: document.getElementById('nombre_completo').value,
        correo: document.getElementById('correo_electronico').value,
        telefono: document.getElementById('telefono').value
    });

    try {
        await ocuparAsientos(pedido.funcionId, pedido.asientos);
    } catch (error) {
        console.log('Sin backend, se continua en modo demo');
    }

    window.location.href = 'confirmacion_5.html';
});

if (pedido.asientos) {
    mostrarResumen();
} else {
    window.location.href = 'index.html';
}