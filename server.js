// Servidor de la App del Clima
// Lee la clave de API desde el archivo .env (nunca se envía al navegador)
// y hace las peticiones a OpenWeatherMap.

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Sirve la página (HTML, CSS y JS) desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta que usa la página para pedir el clima de una ciudad
app.get('/api/clima', async (req, res) => {
  const ciudad = (req.query.ciudad || '').trim();

  // Error: campo vacío
  if (!ciudad) {
    return res.status(400).json({ error: 'Escribe el nombre de una ciudad.' });
  }

  // Error: falta la clave en el .env
  if (!API_KEY || API_KEY === 'pega_aqui_tu_clave') {
    return res.status(500).json({ error: 'Falta la clave de API. Revisa tu archivo .env.' });
  }

  const url =
    'https://api.openweathermap.org/data/2.5/weather' +
    `?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;

  // Si la API tarda más de 8 segundos, cancelamos la petición
  const controller = new AbortController();
  const temporizador = setTimeout(() => controller.abort(), 8000);

  try {
    const respuesta = await fetch(url, { signal: controller.signal });
    const datos = await respuesta.json().catch(() => null);

    if (respuesta.status === 401) {
      return res.status(401).json({
        error: 'La clave de API no es válida o aún no se activa (puede tardar hasta 2 horas).'
      });
    }
    if (respuesta.status === 404) {
      return res.status(404).json({ error: `No se encontró la ciudad "${ciudad}".` });
    }
    if (respuesta.status === 429) {
      return res.status(429).json({
        error: 'Se alcanzó el límite de peticiones. Espera un minuto e inténtalo de nuevo.'
      });
    }
    if (!respuesta.ok) {
      return res.status(502).json({ error: 'El servicio del clima no respondió correctamente.' });
    }

    // Error: respuesta vacía o incompleta
    if (!datos || !datos.main || !Array.isArray(datos.weather) || datos.weather.length === 0) {
      return res.status(502).json({ error: 'La API devolvió una respuesta vacía. Intenta de nuevo.' });
    }

    // Solo mandamos a la página los datos que necesita
    res.json({
      ciudad: datos.name,
      pais: datos.sys ? datos.sys.country : '',
      temperatura: Math.round(datos.main.temp),
      sensacion: Math.round(datos.main.feels_like),
      minima: Math.round(datos.main.temp_min),
      maxima: Math.round(datos.main.temp_max),
      humedad: datos.main.humidity,
      viento: datos.wind ? Math.round(datos.wind.speed * 3.6) : 0, // m/s a km/h
      descripcion: datos.weather[0].description,
      icono: datos.weather[0].icon
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'La API tardó demasiado en responder. Intenta de nuevo.' });
    }
    // Error: sin conexión a internet
    res.status(503).json({ error: 'No hay conexión con el servicio del clima. Revisa tu internet.' });
  } finally {
    clearTimeout(temporizador);
  }
});

app.listen(PORT, () => {
  console.log(`App del clima lista en http://localhost:${PORT}`);
});
