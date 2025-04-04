# Simulador de Comisiones

Este proyecto es una aplicación React + TypeScript + Vite que permite simular comisiones basadas en un capital inicial y un rango de tiempo.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/simulador-comisiones.git
   cd simulador-comisiones
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

   O si usas `yarn`:

   ```bash
   yarn install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.template`:

   ```bash
   cp .env.template .env
   ```

2. Llena las variables de entorno en el archivo `.env` según sea necesario.

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm run dev`

Inicia el servidor de desarrollo. Abre [http://localhost:5173](http://localhost:5173) para verlo en tu navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `dist`.

### `npm run preview`

Sirve la aplicación construida localmente para verificarla antes de desplegarla.

### `npm run lint`

Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
