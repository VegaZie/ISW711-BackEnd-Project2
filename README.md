# API de CRUD de Usuarios y Ejecución de Prompts

Este es un API que proporciona operaciones CRUD para usuarios y ejecución de prompts de tres modelos de OpenAI (completions, edit e images). Las rutas de la API están protegidas por JWT (JSON Web Token), lo que garantiza que las operaciones solo puedan ser realizadas por usuarios autenticados y verificados.

## Endpoints

### Autenticación

- **POST /api/authenticate**
  Endpoint para autenticar a un usuario mediante su correo electrónico y contraseña. Retorna un token JWT válido para realizar operaciones protegidas.

### Usuarios

- **POST /api/user**
  Endpoint para crear un nuevo usuario en la base de datos. No está protegido por JWT.

- **GET /api/user**
  Endpoint para obtener información del usuario actual. Protegido por JWT.

- **PATCH /api/user**
  Endpoint para actualizar información del usuario actual. Protegido por JWT.

- **DELETE /api/user**
  Endpoint para eliminar la cuenta del usuario actual. Protegido por JWT.

### Prompts

- **POST /api/promt**
  Endpoint para crear un nuevo prompt. Protegido por JWT.

- **GET /api/promt**
  Endpoint para obtener la lista de prompts. Protegido por JWT.

- **PATCH /api/promt**
  Endpoint para actualizar un prompt específico. Protegido por JWT.

- **DELETE /api/promt**
  Endpoint para eliminar un prompt específico. Protegido por JWT.

### Ejecución de Prompts

- **POST /api/promt/execute/edit**
  Endpoint para ejecutar un prompt del modelo "edit". Protegido por JWT.

- **POST /api/promt/execute/completions**
  Endpoint para ejecutar un prompt del modelo "completions". Protegido por JWT.

- **POST /api/promt/execute/images**
  Endpoint para ejecutar un prompt del modelo "images". Protegido por JWT.

## Requisitos

- Node.js y npm instalados
- Base de datos MongoDB

## Configuración

1. Clonar este repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Configurar las variables de entorno las cuales están en el ".env.template".
4. Ejecutar la aplicación con `node index.js`.

## Autorización y Autenticación

La API utiliza JSON Web Tokens (JWT) para la autorización y autenticación de usuarios. Los endpoints protegidos requieren que el token JWT sea proporcionado en el encabezado de la solicitud bajo la clave "Authorization" en el formato "Bearer {token}". Los usuarios deben autenticarse utilizando el endpoint `/api/authenticate` para obtener un token válido antes de acceder a las rutas protegidas.

## Notas

- Se recomienda utilizar HTTPS para proteger las comunicaciones y asegurarse de que los tokens JWT no sean interceptados por terceros.
- Esta API utiliza modelos de OpenAI para la ejecución de prompts. Se deben proporcionar las claves de API correspondientes para que funcione correctamente.
