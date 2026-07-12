const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'docs')));

const rutaJSON = path.join(__dirname, 'data', 'cartelera.json');
const datos = JSON.parse(fs.readFileSync(rutaJSON, 'utf-8'));
console.log(`Cargadas ${datos.peliculas.length} peliculas y ${datos.funciones.length} funciones`);

app.get('/api/cartelera', (req, res) => {
  res.status(200).json(datos);
});

app.get('/api/peliculas/:id', (req, res) => {
  const pelicula = datos.peliculas.find((p) => p.id === parseInt(req.params.id));
  if (!pelicula) {
    return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
  }
  res.status(200).json(pelicula);
});

app.get('/api/funciones/:id', (req, res) => {
  const funcion = datos.funciones.find((f) => f.id === parseInt(req.params.id));
  if (!funcion) {
    return res.status(404).json({ mensaje: 'Funcion no encontrada' });
  }
  res.status(200).json(funcion);
});

app.post('/api/funciones/:id/ocupar', (req, res) => {
  const funcion = datos.funciones.find((f) => f.id === parseInt(req.params.id));
  if (!funcion) {
    return res.status(404).json({ mensaje: 'Funcion no encontrada' });
  }

  const { asientos } = req.body;
  if (!Array.isArray(asientos) || asientos.length === 0) {
    return res.status(400).json({ mensaje: 'Se requiere un array "asientos" no vacio' });
  }

  const colision = asientos.filter((a) => funcion.asientosOcupados.includes(a));
  if (colision.length > 0) {
    return res.status(409).json({ mensaje: 'Asientos ya ocupados', asientos: colision });
  }

  asientos.forEach((a) => funcion.asientosOcupados.push(a));

  res.status(200).json(funcion);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
