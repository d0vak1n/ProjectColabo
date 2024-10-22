# ProjectColabo

ProjectColabo es una plataforma donde alumnos, estudiantes y programadores pueden subir sus proyectos y permitir que otros del mismo ámbito colaboren en ellos. Los usuarios pueden crear cuentas, subir sus proyectos, explorar los proyectos de otros y contribuir a los mismos.

## Tecnologías Utilizadas

### Frontend:
- **Vite**: Empaquetador de módulos rápido.
- **React**: Librería para construir interfaces de usuario.
- **JavaScript**: Lenguaje de programación principal.
- **Material UI**: Librería de componentes de UI.
- **JWT**: Autenticación segura mediante JSON Web Tokens.

### Backend:
- **Node.js**: Entorno para ejecutar JavaScript en el servidor.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **Express**: Framework minimalista para el desarrollo de APIs.
- **MySQL**: Base de datos relacional.
- **JWT**: Autenticación y autorización.

---

## Requisitos Previos

### Herramientas necesarias:
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm (v7 o superior) o yarn

---

## Instalación y Configuración

### Clonar el repositorio:
```
git clone https://github.com/usuario/ProjectColabo.git
```

#### Configuración del Frontend

Navegar al directorio del frontend:


```
cd frontend
```
#### Instalar dependencias:

```
npm install
```

Iniciar la aplicación en modo desarrollo:

```
npm run dev
```

Configuración del archivo .env:
Crear un archivo .env con las siguientes variables:

```
VITE_API_URL=http://localhost:5000/api
```

#### Configuración del Backend

Navegar al directorio del backend:

```
cd backend
```

Instalar dependencias:
```
npm install
```

#### Configurar la base de datos: Crear una base de datos en MySQL llamada project_colabo. Actualizar las credenciales en el archivo .env del backend:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=project_colabo
JWT_SECRET=tu_secreto_jwt
```

Iniciar el servidor:

```
npm run dev
```

## Estructura del Proyecto

| Directorio/Archivo  | Descripción                                                                            |
|---------------------|----------------------------------------------------------------------------------------|
| `/frontend`         | Código fuente del frontend construido con React, Vite y Material UI                    |
| `/backend`          | Código fuente del backend construido con Node.js, TypeScript y Express                 |
| `/frontend/src`     | Contiene los componentes React, rutas y servicios del frontend                         |
| `/backend/src`      | Contiene los controladores, modelos y rutas del backend                                |
| `.env.example`      | Ejemplo de archivo de configuración de variables de entorno                            |

## Funcionalidades

- **Autenticación de usuarios**: Registro y login mediante JWT.
- **Creación de proyectos**: Los usuarios pueden crear nuevos proyectos.
- **Exploración de proyectos**: Los usuarios pueden explorar proyectos creados por otros usuarios.
- **Colaboración en proyectos**: Posibilidad de solicitar unirse a un proyecto y colaborar.

---

## Endpoints del Backend

| Método  | Endpoint              | Descripción                             |
|---------|-----------------------|-----------------------------------------|
| POST    | `/api/auth/register`   | Registrar un nuevo usuario              |
| POST    | `/api/auth/login`      | Iniciar sesión y obtener un token JWT   |
| GET     | `/api/projects`        | Obtener la lista de proyectos           |
| POST    | `/api/projects`        | Crear un nuevo proyecto                 |
| PUT     | `/api/projects/:id`    | Actualizar un proyecto existente        |
| DELETE  | `/api/projects/:id`    | Eliminar un proyecto                    |

## Contribuir

¡Las contribuciones son bienvenidas! Sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios.
4. Haz un commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
5. Sube los cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.
