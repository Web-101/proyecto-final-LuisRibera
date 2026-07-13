const pedido = leerPedido();

if (!pedido.asientos) {
    window.location.href = 'index.html';
} else {
    document.getElementById('nombre_cliente_confirmacion').textContent = pedido.nombre;
    document.getElementById('correo_cliente_confirmacion').textContent = pedido.correo;

    document.getElementById('ticket_banner').src = pedido.poster;
    document.getElementById('ticket_pelicula').textContent = pedido.pelicula;
    document.getElementById('ticket_hora').textContent = `${pedido.hora} hs`;
    document.getElementById('ticket_sala').textContent = pedido.sala;
    document.getElementById('ticket_asientos').textContent = pedido.asientos.join(', ');
    document.getElementById('ticket_reserva').textContent = generarCodigoReserva();
    document.getElementById('ticket_total').textContent = bs(pedido.total);

    limpiarPedido();
}
