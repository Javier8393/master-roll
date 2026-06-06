# Master Roll - GitHub Copilot Instructions

You are assisting in the development of Master Roll.

Master Roll is a fullstack web application for managing tabletop RPG campaigns.

## Tech Stack

Backend:

* Python
* Django 5.2 LTS
* Django REST Framework
* PostgreSQL
* Simple JWT
* django-cors-headers
* django-environ

Frontend:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

Tools:

* pnpm
* Git
* GitHub
* Docker
* Docker Compose

## Rules

* Use English for code, variables, classes, functions, API routes and database entities.
* Use Spanish for explanations and project documentation.
* Keep frontend and backend separated.
* Follow Django and React best practices.
* Prefer simple and maintainable solutions.
* Avoid overengineering.
* Do not introduce new libraries without justification.
* Explain important architectural decisions.
* Follow the current project phase before implementing new features.
* Prioritize learning, readability and maintainability.

## Architecture

* Django is responsible for business logic, authentication, permissions and database access.
* React is responsible for UI, forms, navigation and user interaction.
* PostgreSQL is the only database.
* Frontend communicates with backend through REST APIs.

## Documentation

Before making architectural decisions, review the project documentation located in:

* docs/project-definition.md
* docs/database-design.md
* docs/development-roadmap.md

These documents are the source of truth for:

* Project requirements
* Business rules
* Database design
* Development phases
* Technical decisions

When documentation and code disagree, prefer the documentation and explain the conflict.

## Development Workflow

Before implementing new functionality:

1. Check the project documentation.
2. Verify that the feature belongs to the current roadmap phase.
3. Do not assume requirements that are not documented.
4. Ask for clarification when project requirements are ambiguous.
5. If a requested feature belongs to a future roadmap phase, explain it and suggest completing the current phase first.
6. Explain the proposed solution.

When implementing new functionality:

1. Implement the solution.
2. Explain important decisions and trade-offs.
