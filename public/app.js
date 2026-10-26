// Lógica de la página: lee la ciudad, pide el clima al servidor y lo muestra.

const formulario = document.getElementById('formulario');
const inputCiudad = document.getElementById('ciudad');
const boton = document.getElementById('boton');
const mensaje = document.getElementById('mensaje');
const resultado = document.getElementById('resultado');

function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.classList.toggle('error', esError);
  mensaje.classList.remove('oculto');
}

function ocultarMensaje() {
  mensaje.classList.add('oculto');
}

function mostrarClima(datos) {
  document.getElementById('nombre-ciudad').textContent =
    datos.pais ? `${datos.ciudad}, ${datos.pais}` : datos.ciudad;
  document.getElementById('temperatura').textContent = `${datos.temperatura}°C`;
  document.getElementById('descripcion').textContent = datos.descripcion;
  document.getElementById('sensacion').textContent = `${datos.sensacion}°C`;
  document.getElementById('minmax').textContent = `${datos.minima}° / ${datos.maxima}°`;
  document.getElementById('humedad').textContent = `${datos.humedad}%`;
  document.getElementById('viento').textContent = `${datos.viento} km/h`;

  const icono = document.getElementById('icono');
  icono.src = `https://openweathermap.org/img/wn/${datos.icono}@2x.png`;
  icono.alt = datos.descripcion;

  resultado.classList.remove('oculto');
}

async function buscarClima(ciudad) {
  // Error: campo vacío
  if (!ciudad) {
    mostrarMensaje('Escribe el nombre de una ciudad.', true);
    return;
  }

  // Error: sin conexión a internet
  if (!navigator.onLine) {
    mostrarMensaje('No tienes conexión a internet.', true);
    return;
  }

  resultado.classList.add('oculto');
  mostrarMensaje('Buscando...');
  boton.disabled = true;

  try {
    const respuesta = await fetch(`/api/clima?ciudad=${encodeURIComponent(ciudad)}`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'Ocurrió un error inesperado.', true);
      return;
    }

    ocultarMensaje();
    mostrarClima(datos);
  } catch (error) {
    // El servidor está apagado o no se pudo conectar
    mostrarMensaje('No se pudo conectar con el servidor. ¿Está encendido?', true);
  } finally {
    boton.disabled = false;
  }
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  buscarClima(inputCiudad.value.trim());
});
