let carteleraCache = null;

async function obtenerCartelera() {
  if (carteleraCache) {
    return carteleraCache;
  }
  try {
    const respuesta = await fetch(`${API_URL}/cartelera`);
    if (!respuesta.ok) {
      throw new Error('Respuesta no valida del servidor');
    }
    carteleraCache = await respuesta.json();
  } catch (error) {
    const respaldo = await fetch(RUTA_JSON);
    carteleraCache = await respaldo.json();
  }
  return carteleraCache;
}

async function obtenerPelicula(id) {
  const cartelera = await obtenerCartelera();
  return cartelera.peliculas.find((pelicula) => pelicula.id === Number(id));
}

async function obtenerFuncion(idFuncion) {
  const cartelera = await obtenerCartelera();
  return cartelera.funciones.find((funcion) => funcion.id === Number(idFuncion));
}

async function obtenerFuncionesDePelicula(idPelicula) {
  const cartelera = await obtenerCartelera();
  return cartelera.funciones.filter((funcion) => funcion.peliculaId === Number(idPelicula));
}

async function ocuparAsientos(idFuncion, asientos) {
  const respuesta = await fetch(`${API_URL}/funciones/${idFuncion}/ocupar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ asientos }),
  });
  if (!respuesta.ok) {
    throw new Error('No se pudieron ocupar los asientos');
  }
  return respuesta.json();
}
