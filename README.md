# 🌤️ App del Clima

Aplicación web que muestra el clima actual de cualquier ciudad usando la API de [OpenWeatherMap](https://openweathermap.org/).

**Autor:** [joelcanchechac2007-ai](https://github.com/joelcanchechac2007-ai)

## Funciones

- Buscar el clima por nombre de ciudad.
- Muestra temperatura, sensación térmica, mínima y máxima, humedad, viento y descripción con ícono.
- Manejo de errores:
  - Campo vacío.
  - Ciudad no encontrada.
  - Sin conexión a internet o servidor apagado.
  - Respuesta vacía de la API.
  - Límite de peticiones alcanzado (error 429).
  - Clave de API inválida o faltante.
  - La API tarda demasiado en responder.
- La clave de API se guarda en un archivo `.env` que **no se sube** al repositorio.

## Tecnologías

- **Node.js + Express:** servidor que consulta la API y protege la clave.
- **HTML, CSS y JavaScript:** interfaz.
- **dotenv:** lee las variables del archivo `.env`.

## Cómo ejecutarla

### Requisitos

- [Node.js](https://nodejs.org/) versión 18 o mayor.
- Una clave gratuita de [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/joelcanchechac2007-ai/app-clima.git
   cd app-clima
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia `.env.example`, renombra la copia a `.env` y pega tu clave:
   ```
   OPENWEATHER_API_KEY=tu_clave_aqui
   PORT=3000
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Abre en el navegador: **http://localhost:3000**

> Nota: una clave nueva de OpenWeatherMap puede tardar hasta 2 horas en activarse.

## Estructura

```
app-clima/
├── public/
│   ├── index.html   # Estructura de la página
│   ├── style.css    # Diseño
│   └── app.js       # Lógica del navegador
├── server.js        # Servidor y conexión con la API
├── .env.example     # Ejemplo de variables de entorno
├── .gitignore       # Evita subir .env y node_modules
└── package.json
```

## Declaración de uso de IA

| Herramienta | Para qué la usé |
|---|---|
| Claude (Anthropic) | Generar la estructura inicial del proyecto, el código del servidor y de la página, el manejo de errores y el borrador de este README. |


### Lo que hice sin ayuda de IA

Sin ayuda de IA, me encargué de preparar todo el entorno y de llevar el proyecto hasta GitHub. Activé mi cuenta de GitHub Student Developer Pack, creé la carpeta del proyecto e instalé Node.js para poder ejecutar la aplicación. También creé mi cuenta en OpenWeatherMap, obtuve mi clave de API y la configuré en el archivo .env, cuidando que este archivo no se subiera al repositorio para mantenerla protegida. Después creé el repositorio en GitHub, configuré Git con mi nombre y mi correo, y ejecuté los comandos para hacer los commits y subir el proyecto. Por último, probé la aplicación en el navegador para comprobar que mostrara correctamente el clima y los mensajes de error.

## Bitácora

La bitácora de programación con IA está en [BITACORA.md](BITACORA.md).
