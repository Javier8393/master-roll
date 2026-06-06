# Master Roll — Project Definition

# 1. Description

Master Roll is a web application designed to manage tabletop RPG campaigns in a digital environment.

The goal of the application is to provide players and game masters with a centralized platform where they can create characters, manage campaigns, organize inventories, and administer the elements required during a roleplaying session.

The application follows a client-server architecture:

* Backend developed with Django.
* REST API developed with Django REST Framework.
* Frontend developed with React and TypeScript.
* PostgreSQL as the database system.

---

# 2. User Permissions

Master Roll does not use exclusive roles.

Every authenticated user is a Player by default.

Master and Admin are additional privileges.

A user can be:

* Player
* Player + Master
* Player + Admin
* Player + Master + Admin

## Player

Default permission level for every authenticated user.

Permissions:

* Create characters.
* Manage owned characters.
* Equip and unequip items.
* Join campaigns.
* View campaign information.
* View character sheets.
* Manage personal inventories.

## Master

Additional privilege granted by an Admin.

Permissions:

* Create campaigns.
* Manage owned campaigns.
* View participating characters.
* Modify character health.
* Grant experience.
* Manage inventories.
* Give or remove items.
* Control campaign progression.
* Manage campaign-related content.

## Admin

Highest privilege level.

An Admin is also considered a Player and a Master.

Permissions:

* Full user management.
* Create, edit and deactivate users.
* Grant or revoke Master privileges.
* Grant or revoke Admin privileges.
* Create and manage races.
* Create and manage jobs.
* Create and manage statistics.
* Create and manage items.
* Create and manage enemies.
* Configure global game content.
* Access all administrative tools.

## Permission Evaluation Rules

Permissions are evaluated using the following derived logic, not by checking flags directly:

* `has_player_access` — always `True` for any active authenticated user.
* `has_master_access` — `True` if `is_master = True` OR `is_admin = True`.
* `has_admin_access` — `True` if `is_admin = True`.

These rules are implemented as properties on the User model. All permission checks in the application must use these properties instead of reading the raw flags.

---

# 3. System Philosophy

Master Roll is designed around configurable game content.

The application should allow administrators to expand the game without modifying source code whenever possible.

Administrators can create:

* New races.
* New jobs.
* New statistics.
* New enemies.
* New items.

The application separates:

* Content configuration.
* Application architecture.

Administrators are responsible for content.

Developers are responsible for:

* Application structure.
* Business rules.
* Calculation systems.
* Complex game mechanics.
* Technical implementation.

---

# 4. Statistics System

Statistics are configurable entities managed by the Admin.

Examples:

* Strength
* Endurance
* Dexterity
* Agility
* Intelligence
* Perception
* Charisma
* Luck

The system should allow administrators to create additional statistics in the future.

Examples:

* Mana
* Willpower
* Faith

Statistics are used by races, jobs, characters, items and enemies.

---

# 5. Characters

Characters represent playable entities controlled by users.

A Character is not the same as a User.

Characteristics:

* A character belongs to one user.
* A user can own multiple characters.
* A character can participate in multiple campaigns.
* A character has a race.
* A character has a job.
* A character can equip items.
* A character can gain experience.
* A character can level up.

Character progression is persistent and independent from campaign participation.

Final character attributes are calculated from:

```text
Racial statistics
+
Job statistics
+
Player allocated points
+
Equipment bonuses
+
Temporary effects
```

---

# 6. Campaigns

A campaign represents a specific tabletop RPG adventure managed by a Master.

A campaign contains:

* Name.
* Description.
* Difficulty.
* Responsible Master.
* Participating users.
* Participating characters.
* Available enemies.
* Available items.
* Missions and objectives.

Campaigns act as containers for roleplaying sessions and character progression.

---

# 7. Inventory System

Characters possess inventories that contain their items.

Items can exist in two states:

* Stored.
* Equipped.

Equipped items may modify character attributes and abilities.

Inventory management is primarily handled by players, while Masters can modify inventories during campaign administration.

---

# 8. Enemies

Enemies represent hostile creatures or NPCs.

Enemies may have:

* A race.
* A job.
* A level.
* Statistics.
* Rewards.
* Experience value.

Enemies are configurable entities managed by the Admin and used by Masters inside campaigns.

---

# 9. Initial Database Scope

The first version of Master Roll is expected to include the following core entities:

* User
* Stat
* Race
* RaceStatModifier
* Job
* JobStatModifier
* Character
* CharacterStatAllocation

Campaigns, items and enemies will be added in later iterations.

The exact database design is documented separately in:

`docs/database-design.md`

---

# 10. Technology Stack

## Backend

* Python
* Django 5.2 LTS
* Django REST Framework
* PostgreSQL
* Simple JWT
* django-cors-headers
* django-environ

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

## Tools

* pnpm
* Git
* GitHub
* Docker
* Docker Compose

## API

* All API routes use the `/api/v1/` prefix.
* Example: `/api/v1/auth/login/`, `/api/v1/characters/`.
* Versioning allows future breaking changes without disrupting existing clients.

---

# 11. Project Goals

Master Roll has two primary objectives:

1. Provide a functional platform for managing tabletop RPG campaigns.

2. Serve as a learning project focused on:

* Backend development.
* REST API design.
* Relational databases.
* Authentication and authorization.
* React development.
* Fullstack application architecture.
* Professional software development practices.
