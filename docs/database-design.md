# Master Roll — Database Design

## Overview

This document defines the database design for Master Roll.

The database design will evolve through multiple iterations.

The first iteration focuses on the minimum functionality required to support:

* User authentication
* User permissions
* Configurable statistics
* Configurable races
* Configurable jobs
* Playable character creation

Systems such as campaigns, inventory, items, enemies and combat will be implemented in later phases.

---

# Design Principles

## Store Source Data, Not Calculated Data

The database should store the values required to calculate character statistics.

Final statistics should be calculated by the application instead of being permanently stored.

Example:

Final Strength =

* Race bonus
* Job bonus
* Allocated points
* Equipment bonuses
* Temporary effects

During the first iteration only race bonuses, job bonuses and allocated points are considered.

---

## Permission-Based Users

Master Roll does not use exclusive roles.

Every authenticated user is considered a Player.

Additional permissions are granted through flags:

* Master
* Admin

This allows combinations such as:

* Player
* Player + Master
* Player + Admin
* Player + Master + Admin

---

## Configurable Game Content

Administrators should be able to create and manage game content without modifying source code.

Examples:

* Statistics
* Races
* Jobs

Administrators should not be able to modify the database schema itself.

New content should be represented through entities and relationships.

---

## Character Creation

A Player should be able to create a character using:

* Active statistics
* Playable races
* Active jobs

---

# First Iteration Scope

The first database iteration includes the following entities:

* User
* Stat
* Race
* RaceStatModifier
* Job
* JobStatModifier
* Character
* CharacterStatAllocation

This scope is enough to achieve the first major project goal:

A user can:

* Register
* Log in
* Create a character
* Select a race
* Select a job
* Allocate points
* View calculated statistics

---

# Entity: User

Represents an account in the application.

A User is not the same as a Character.

A User owns Characters.

## Fields

* id
* username
* email
* password
* is_master
* is_admin
* is_active
* created_at
* updated_at

## Rules

* Every authenticated user is a Player.
* Users can own multiple characters.
* Users with `is_master = true` can create and manage campaigns.
* Users with `is_admin = true` have administrative privileges.
* An Admin is also considered a Master and a Player.
* A Master is also considered a Player.

---

# Entity: Stat

Represents a configurable statistic.

Examples:

* Strength
* Endurance
* Dexterity
* Agility
* Intelligence
* Perception
* Charisma
* Luck

## Fields

* id
* name
* code
* description
* is_active
* order
* created_at
* updated_at

## Rules

* Name is the display name.
* Code is the internal identifier.
* Code must be unique.
* Inactive statistics cannot be assigned to new content.
* Existing data must remain valid if a statistic is deactivated.

---

# Entity: Race

Represents a character race.

Examples:

* Human
* Elf
* Dwarf
* Orc

## Fields

* id
* name
* description
* racial_skill (text, optional)
* playable
* is_active
* created_at
* updated_at

## Notes

* `racial_skill` is a free-text field describing the race's special ability.
* Complex skill systems will be implemented in future phases.

## Rules

* Only active and playable races can be selected by Players.
* Administrators can create and edit races.
* A race can modify multiple statistics.
* Future versions may include non-playable races.

---

# Entity: RaceStatModifier

Represents a statistic bonus or penalty granted by a race.

## Fields

* id
* race_id
* stat_id
* value
* created_at
* updated_at

## Example

Human:

* Strength +1
* Dexterity +1

Elf:

* Intelligence +2

Dwarf:

* Endurance +2

## Rules

* A race can have multiple modifiers.
* A modifier belongs to one race.
* A modifier belongs to one statistic.
* Duplicate race/stat combinations are not allowed.
* Values can be positive, negative or zero.

---

# Entity: Job

Represents a character profession or class.

The project uses the term Job instead of Class.

Examples:

* Warrior
* Mage
* Rogue
* Cleric

## Fields

* id
* name
* description
* job_skill (text, optional)
* is_active
* created_at
* updated_at

## Notes

* `job_skill` is a free-text field describing the job's special ability.
* Complex skill systems will be implemented in future phases.

## Rules

* Only active jobs can be selected during character creation.
* Administrators can create and edit jobs.
* A job can modify multiple statistics.

---

# Entity: JobStatModifier

Represents a statistic bonus or penalty granted by a job.

## Fields

* id
* job_id
* stat_id
* value
* created_at
* updated_at

## Example

Warrior:

* Strength +3
* Endurance +2

Mage:

* Intelligence +4

Rogue:

* Dexterity +3

## Rules

* A job can have multiple modifiers.
* A modifier belongs to one job.
* A modifier belongs to one statistic.
* Duplicate job/stat combinations are not allowed.
* Values can be positive, negative or zero.

---

# Entity: Character

Represents a playable character.

## Fields

* id
* name
* gender
* age
* level
* experience
* current_hp
* user_id
* race_id
* job_id
* is_active
* created_at
* updated_at

## Rules

* A character belongs to one user.
* A user can own multiple characters.
* A character has one race.
* A character has one job.
* A character starts at level 1.
* A character starts with 0 experience.
* Current HP is stored because it changes during gameplay and is not calculable.
* Maximum HP is a derived value calculated from final Endurance. It is not stored.
* Final statistics are calculated, not stored.

---

# Entity: CharacterStatAllocation

Represents permanent points assigned by the player.

## Fields

* id
* character_id
* stat_id
* value
* created_at
* updated_at

## Example

Eiron:

* Strength +5
* Intelligence +2
* Dexterity +3

## Rules

* A character can allocate points to multiple statistics.
* An allocation belongs to one character.
* An allocation belongs to one statistic.
* Duplicate character/stat combinations are not allowed.
* Values cannot be negative.
* Allocated points remain even if the character changes job in the future.

---

# Relationships

| Relationship                            | Description                                             |
| --------------------------------------- | ------------------------------------------------------- |
| User 1 → N Character                    | A user can own multiple characters                      |
| Race 1 → N Character                    | A race can be used by multiple characters               |
| Job 1 → N Character                     | A job can be used by multiple characters                |
| Race 1 → N RaceStatModifier             | A race can modify multiple statistics                   |
| Stat 1 → N RaceStatModifier             | A statistic can be modified by multiple races           |
| Job 1 → N JobStatModifier               | A job can modify multiple statistics                    |
| Stat 1 → N JobStatModifier              | A statistic can be modified by multiple jobs            |
| Character 1 → N CharacterStatAllocation | A character can allocate points to multiple statistics  |
| Stat 1 → N CharacterStatAllocation      | A statistic can receive points from multiple characters |

## Deletion Rules

* Deleting a `Race` is blocked (`PROTECT`) if any `Character` references it.
* Deleting a `Job` is blocked (`PROTECT`) if any `Character` references it.
* Deleting a `Stat` is blocked (`PROTECT`) if any `RaceStatModifier`, `JobStatModifier` or `CharacterStatAllocation` references it.
* Game content must be deactivated (`is_active = False`) instead of deleted.

---

# Character Stat Calculation

During the first iteration:

Final Stat =

* Race modifiers
* Job modifiers
* Allocated points

Example:

Human:

* Strength +1

Warrior:

* Strength +3

Allocated Points:

* Strength +5

Final Strength:

* 1 + 3 + 5 = 9

## Derived Values

The following values are calculated by the application and are not stored in the database.

### Maximum HP

Maximum HP is derived from final Endurance.

```
max_hp = final_endurance * 10
```

Example:

* Final Endurance: 10
* Maximum HP: 100

### Available Stat Points

The number of unspent stat points available to a character.

```
stat_points_available = 10 + (level - 1) * 5 - sum(CharacterStatAllocations)
```

Example:

* Level 3 character: 10 + (3 - 1) * 5 = 20 total points
* Allocated points: 14
* Available: 20 - 14 = 6

Both `max_hp` and `stat_points_available` must be returned by the API when serving character data.

## Experience and Level Progression

Experience required to reach the next level:

```
xp_to_next_level = current_level * 100
```

Example:

* Level 1 → 2: 100 XP
* Level 2 → 3: 200 XP
* Level 3 → 4: 300 XP

---

# Not Included Yet

The following systems are intentionally excluded from the first iteration:

* Campaigns
* Campaign participation
* Items
* Inventory
* Equipment
* Enemies
* Combat
* Maps
* Quests
* Logs
* Real-time systems

These systems will be added in future iterations.

---

# Character Rules

## Character Creation

* Starting stat points: 10
* Starting level: 1
* Starting experience: 0

## Character Progression

* Stat points gained per level: 5
* Allocated points are permanent.
* Allocated points remain after future job changes.

## Health System

* HP per Endurance point: 10
* Maximum HP is calculated from final Endurance.
* Maximum HP is recalculated whenever Endurance changes.
* Current HP cannot exceed Maximum HP.

## Character Data

* Gender values:

  * Male
  * Female

* Age is mandatory.

## Statistics

* Deactivated statistics remain visible in existing characters.
* Deactivated statistics cannot be used in new configurations.
* Deactivated statistics cannot be assigned to new races or jobs.

## Jobs

* Job changes are not included in the first version of the application.
