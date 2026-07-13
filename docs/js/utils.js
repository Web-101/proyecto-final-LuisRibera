function bs(monto) {
  return `Bs ${Number(monto).toFixed(2)}`;
}

function generarCodigoReserva() {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  return `CINE-${codigo}`;
}

