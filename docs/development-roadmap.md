# Master Roll — Development Roadmap

This document defines the development phases of the Master Roll project.

The roadmap follows functional dependencies. Each phase should be completed before moving to the next one.

---

# Phase 0 — Design and Planning

## Objectives

* Define project scope.
* Define technology stack.
* Define frontend/backend architecture.
* Define user roles and permissions.
* Define AI assistant instructions.
* Create project documentation.
* Design the first database iteration.
* Prepare the development roadmap.

## Deliverables

* `docs/project-definition.md`
* `docs/database-design.md`
* `docs/development-roadmap.md`
* `.github/copilot-instructions.md`

## Result

A complete project blueprint ready for implementation.

---

# Phase 1 — Development Environment

## Objectives

* Create Git repository.
* Create project folder structure.
* Configure Python environment and virtual env.
* Configure pnpm.
* Configure environment variables.
* Create Django project skeleton.
* Configure Django settings (PostgreSQL, DRF, CORS, environ).
* Create initial Django apps.
* Confirm backend health endpoint (`/api/v1/health/`).
* Configure pytest and pytest-django.
* Create React project skeleton with Vite.
* Configure TypeScript.
* Configure Tailwind CSS.
* Configure React Router.
* Configure Axios.
* Configure Docker and Docker Compose.
* Verify full stack runs with `docker-compose up`.

## Deliverables

* `.gitignore`
* `README.md`
* `.env.example`
* `docker-compose.yml`
* `backend/Dockerfile`
* `frontend/Dockerfile`
* `backend/config/settings.py`
* `backend/pytest.ini`
* `frontend/` (React + Vite project)

## Result

The full stack (Django + PostgreSQL + React) starts correctly with `docker-compose up`. The health endpoint responds and the frontend serves the base app.

---

# Phase 2 — Backend Base

## Objectives

* Create Django project.
* Install Django REST Framework.
* Configure PostgreSQL.
* Configure django-environ.
* Configure django-cors-headers.
* Create initial Django apps.
* Confirm backend health endpoint.
* Configure pytest and pytest-django.

## Result

Django backend is running and connected to PostgreSQL. Test suite is operational.

---

# Phase 3 — Authentication and User Roles

## Objectives

* Create custom User model.
* Implement user registration.
* Implement login.
* Implement logout.
* Configure Simple JWT.
* Define roles:

  * Admin
  * Master
  * Player
* Add role-based permissions.
* Write tests for registration, login, logout and permission evaluation.

## Result

Users can authenticate and have role-based access.

---

# Phase 4 — User Management

## Objectives

* User CRUD for Admin.
* User profile endpoint.
* Activate and deactivate users.
* Grant or revoke Master privileges.
* Write tests for user management endpoints and permission enforcement.

## Result

Admin can manage users and roles.

---

# Phase 5 — Statistics System

## Objectives

* Create Stat model.
* Create Stat CRUD.
* Allow Admin to create configurable statistics.
* Prepare initial seed data for basic stats.
* Write tests for stat creation, deactivation and access restrictions.

## Initial Stats

* Strength
* Endurance
* Dexterity
* Agility
* Intelligence
* Perception
* Charisma
* Luck

## Result

The application has a configurable statistics system.

---

# Phase 6 — Race System

## Objectives

* Create Race model.
* Create RaceStatModifier model.
* Create Race CRUD.
* Assign stat modifiers to races.
* Mark races as playable or non-playable.
* Write tests for race creation, stat modifiers and deletion protection.

## Result

Admin can create races and define their stat bonuses.

---

# Phase 7 — Job System

## Objectives

* Create Job model.
* Create JobStatModifier model.
* Create Job CRUD.
* Assign stat modifiers to jobs.
* Write tests for job creation, stat modifiers and deletion protection.

## Result

Admin can create jobs and define their stat bonuses.

---

# Phase 8 — Character System

## Objectives

* Create Character model.
* Create CharacterStatAllocation model.
* Allow Players to create characters.
* Allow Players to select race.
* Allow Players to select job.
* Allow Players to allocate stat points.
* Calculate final character stats.
* Write tests for character creation, stat calculation, max_hp derivation and stat_points_available.

## Result

Players can create and manage playable characters.

---

# Phase 9 — Frontend Authentication UI

## Objectives

* Create base layout.
* Create login page.
* Create register page.
* Connect frontend with authentication API.
* Store JWT tokens and handle session.

## Result

Frontend can authenticate users through the Django API.

---

# Phase 10 — Character Frontend

## Objectives

* Create character list page.
* Create character detail page.
* Create character creation form.
* Load available races.
* Load available jobs.
* Load available stats.
* Send allocated stat points to backend.
* Display final calculated stats.

## Result

Players can create and view characters from the frontend.

---

# Phase 11 — Campaign System

## Objectives

* Create Campaign model.
* Allow Masters to create campaigns.
* Allow Players to join campaigns.
* Assign characters to campaigns.
* Manage campaign participants.

## Result

Campaigns can contain players and playable characters.

---

# Phase 12 — Inventory System

## Objectives

* Create Item model.
* Create character inventory.
* Equip items.
* Unequip items.
* Apply item modifiers.

## Result

Characters can own and equip items.

---

# Phase 13 — Master Panel

## Objectives

* Create campaign administration interface.
* Allow Masters to view participating characters.
* Modify character health.
* Grant experience.
* Give or remove items.
* Manage campaign progression.

## Result

Masters can manage active campaigns.

---

# Phase 14 — Enemy System

## Objectives

* Create Enemy model.
* Create enemy statistics.
* Create enemy rewards.
* Assign enemies to campaigns.

## Result

Masters can use configurable PvE content.

---

# Phase 15 — Advanced Features

## Possible Features

* Combat system.
* Quest system.
* Interactive map.
* Activity logs.
* Notifications.
* Real-time updates.
* Crafting system.
* Guild system.
* Marketplace.

## Result

Expanded functionality without modifying the core architecture.

---

# Development Principles

* Follow the current phase before implementing future features.
* Complete each phase before starting the next.
* Keep frontend and backend responsibilities separated.
* Avoid premature optimization.
* Prefer simple, explicit and maintainable code.
* Document important decisions before implementation.
