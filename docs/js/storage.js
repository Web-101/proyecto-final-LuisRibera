const CLAVE_PEDIDO = 'pedidoCine';

function guardarPedido(datos) {
  const actual = leerPedido();
  const combinado = Object.assign({}, actual, datos);
  sessionStorage.setItem(CLAVE_PEDIDO, JSON.stringify(combinado));
}

function leerPedido() {
  const texto = sessionStorage.getItem(CLAVE_PEDIDO);
  return texto ? JSON.parse(texto) : {};
}

function limpiarPedido() {
  sessionStorage.removeItem(CLAVE_PEDIDO);
}
