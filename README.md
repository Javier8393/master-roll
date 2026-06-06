# Master Roll

Web application for managing tabletop RPG campaigns.

## Tech Stack

- **Backend:** Python, Django 5.2, Django REST Framework, PostgreSQL
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Infrastructure:** Docker, Docker Compose

## Requirements

- Docker and Docker Compose
- Python 3.12 (for local development without Docker)
- pnpm (for local frontend development without Docker)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd master-roll
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set a secure `DJANGO_SECRET_KEY`.

### 3. Start with Docker

```bash
docker-compose up --build
```

| Service  | URL                    |
|----------|------------------------|
| Backend  | http://localhost:8000  |
| Frontend | http://localhost:5173  |
| Database | localhost:5432         |

## Project Structure

```
master-roll/
├── backend/        # Django REST API
├── frontend/       # React + TypeScript app
├── docs/           # Project documentation
└── docker-compose.yml
```

## Documentation

- [Project Definition](docs/project-definition.md)
- [Database Design](docs/database-design.md)
- [Development Roadmap](docs/development-roadmap.md)
