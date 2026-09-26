# Desafío - Like Me (Parte I y II)

## Descripción
Red social "Like Me" con funcionalidad de posts y likes, desarrollada con React + Vite en el frontend y Express + PostgreSQL en el backend.

## Tecnologías
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: PostgreSQL (paquete pg)

## Base de datos
```sql
CREATE DATABASE likeme;

CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
```

## Rutas API
- `GET /posts` — obtiene todos los posts
- `POST /posts` — agrega un nuevo post
- `PUT /posts/like/:id` — incrementa likes de un post
- `PUT /posts/:id` — modifica título, imagen o descripción
- `DELETE /posts/:id` — elimina un post

