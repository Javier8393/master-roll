# Master Roll

Aplicación web para gestionar campañas de rol de mesa.

## Stack tecnológico

- **Backend:** Python, Django 5.2, Django REST Framework, PostgreSQL
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Infraestructura:** Docker, Docker Compose

## Requisitos

- Docker y Docker Compose
- Python 3.12 (para desarrollo local sin Docker)
- pnpm (para desarrollo local del frontend sin Docker)

## Primeros pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/Javier8393/master-roll.git
cd master-roll
```

### 2. Configurar las variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` y rellena los valores reales, especialmente `DJANGO_SECRET_KEY`.

### 3. Arrancar con Docker

```bash
docker-compose up --build
```

| Servicio  | URL                    |
|-----------|------------------------|
| Backend   | http://localhost:8000  |
| Frontend  | http://localhost:5173  |
| Base de datos | localhost:5432     |

## Estructura del proyecto

```
master-roll/
├── backend/        # API REST con Django
├── frontend/       # Aplicación React + TypeScript
├── docs/           # Documentación del proyecto
└── docker-compose.yml
```

## Documentación

- [Definición del proyecto](docs/project-definition.md)
- [Diseño de base de datos](docs/database-design.md)
- [Hoja de ruta](docs/development-roadmap.md)
