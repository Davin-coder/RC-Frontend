# RiwiCommunity — Complete Documentation
> Version: 2025-08-30 · Monorepo Frontend (Vite) + Backend (Express / PostgreSQL)

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Environment Variables](#environment-variables)
- [Database Documentation](#database-documentation)
  - [Database Name](#database-name)
  - [Entity–Relationship Diagram](#entity–relationship-diagram)
  - [Tables](#tables)
    - [users](#users)
    - [groups](#groups)
    - [events](#events)
    - [challenges](#challenges)
    - [hackathons](#hackathons)
  - [Relationships](#relationships)
- [API Documentation](#api-documentation)
  - [Auth & Session](#auth--session)
  - [Users](#users-1)
  - [Groups](#groups-1)
  - [Events](#events-1)
  - [Challenges](#challenges-1)
  - [Hackathons](#hackathons-1)
  - [Special Queries](#special-queries)
  - [Available Endpoints (Summary)](#available-endpoints-summary)
- [Frontend Routes (SPA)](#frontend-routes-spa)
- [Primary User Flow](#primary-user-flow)
- [Error Handling](#error-handling)
- [Security](#security)
- [Performance & Quality](#performance--quality)
- [Deployment](#deployment)
- [Suggested Roadmap](#suggested-roadmap)
- [Contributing & Style](#contributing--style)
- [License](#license)

---

## Tech Stack

**Backend**
- Node.js 18+
- Express 4/5
- PostgreSQL (driver `pg`)
- Session management with `express-session` (HTTP-only cookies)
- `bcrypt` for password hashing
- `cors`, `dotenv`

**Frontend**
- Vite
- Vanilla JavaScript (SPA with hash routing)
- Tailwind CSS
- SweetAlert2
- Icon set: **Lucide**

> Key decisions: server-managed **cookie session** (simpler client-side), **CORS with credentials** for local dev, **SPA** for speed with Vite, and **PostgreSQL** for robust relational modeling.

---

## Project Structure

```bash
RC-Backend/
├─ app.js
├─ .env.example
├─ public/
│  └─ db/                 # (optional) schema/seed/query scripts
└─ src/
   ├─ middleware/
   │  └─ connection.js    # PostgreSQL pool
   ├─ routes/             # users, groups, events, challenges, hackathons
   ├─ controllers/        # validation + orchestration
   └─ models/             # SQL per resource

RC-Frontend/
├─ index.html
├─ .env.example
└─ src/
   ├─ app.js              # hash router + layout
   ├─ pages/              # login, dashboard, challenges, clans, events, hackathons, profile
   ├─ components/         # sidebar, navbar, cards
   └─ utils/              # api.js, auth.js, role.js, userStore.js
```
> Folder names may vary slightly in your repo, but the logical layout matches this structure.

---

## Installation

### Backend
```bash
cd RC-Backend
cp .env.example .env
npm install
node app.js            # http://localhost:3000
```

### Frontend
```bash
cd RC-Frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

### Environment Variables
**Backend `.env`**
```ini
EXPRESSPORT=3000
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=change_me_now

HOST=localhost
DATABASE=riwiCommunity
USER=postgres
PASSWORD=postgres
PORT=5432
```
**Frontend `.env`**
```ini
VITE_API_URL=http://localhost:3000
```

---

## Database Documentation

### Database Name
- `riwiCommunity`
### Entity relationship model
![ER](./public/ERD.png)

### Entity–Relationship Diagram (conceptual)

```
users (id_user, name, last_name, email, password_user, role, id_clan, created_at)
   ├── belongs_to ──► groups (id_group, group_name, id_creator, created_at)
   ├── belongs_to ──► cohorts (id_cohort, cohort_name)         # optional
   └── belongs_to ──► cities (id_city, city_name)               # optional

events (id_event, title, event_type, event_description, event_date, tutor, created_by)
   └── created_by ──► users

challenges (id_challenge, title, challenge_desc, difficulty, created_by)
   └── created_by ──► users

hackathons (id_hackathon, h_title, h_desc, h_date, h_status, creator)
   └── creator ──► users
```

> The repo may not include SQL scripts; treat this as the **conceptual contract**. Adjust column names to your live schema if needed.

### Tables

#### users
- `id_user` (PK, serial)  
- `name`, `last_name` (varchar)  
- `email` (varchar, unique)  
- `password_user` (bcrypt hash)  
- `role` (enum/text: `student|mentor|admin`)  
- `id_clan` (FK → `groups`)  
- `created_at` (timestamp)

**Recommended indexes**: `email`, `role`, `id_clan`

#### groups
- `id_group` (PK)  
- `group_name` (varchar)  
- `id_creator` (FK → `users`)  
- `created_at` (timestamp)

#### events
- `id_event` (PK)  
- `title` (varchar)  
- `event_type` (varchar)  
- `event_description` (text)  
- `event_date` (timestamp)  
- `tutor` (varchar)  
- `created_by` (FK → `users`)

#### challenges
- `id_challenge` (PK)  
- `title` (varchar)  
- `challenge_desc` (text)  
- `difficulty` (varchar: `easy|medium|hard`)  
- `created_by` (FK → `users`)

#### hackathons
- `id_hackathon` (PK)  
- `h_title` (varchar)  
- `h_desc` (text)  
- `h_date` (date/timestamp)  
- `h_status` (varchar: `scheduled|running|finished`)  
- `creator` (FK → `users`)

### Relationships
- `users.id_clan` → `groups.id_group` (many-to-one).  
- `events.created_by`, `challenges.created_by`, `hackathons.creator` → `users.id_user`.  
- Common filters: by **clan**, **hackathon status**, **event date**, **challenge difficulty**.

---

## API Documentation

> Base URL: `http://localhost:3000` — All browser requests must include `credentials: "include"` so the session cookie is sent/received.

### Auth & Session
1. **Login** — `POST /users/login`  
   **Body**
   ```json
   { "email": "user@example.com", "password_user": "secret" }
   ```
   **Response (200)**
   ```json
   { "ok": true, "user": { "id_user": 1, "name": "Ada", "role": "student", "id_clan": 3 } }
   ```

2. **Logout** — `POST /users/logout`  
   Clears the session cookie.

3. **Me** — `GET /users/me`  
   Returns the authenticated user if the session exists.

---

### Users
1. **GET /users** — List users (with city, clan, cohort, email).  
2. **GET /users/:id** — User detail.  
3. **POST /users** — Create user.  
4. **PUT /users/:id** — Update user.  
5. **DELETE /users/:id** — Delete user.

**Example (curl)**
```bash
curl -b cookies.txt http://localhost:3000/users
```

---

### Groups
1. **GET /groups** — List (`group_name`, `id_creator`, `created_at`).  
2. **GET /groups/:id** — Group detail.  
3. **POST /groups** — Create group (`group_name`, `id_creator`).  
4. **PUT /groups/:id** — Update name.  
5. **DELETE /groups/:id** — Delete group.

---

### Events
1. **GET /events** — List (`title`, `event_type`, `event_description`, `event_date`, `tutor`).  
2. **GET /events/:id** — Detail.  
3. **POST /events** — Create.  
4. **PUT /events/:id** — Update.  
5. **DELETE /events/:id** — Delete.

---

### Challenges
1. **GET /challenges** — List (`id_challenge`, `title`, `challenge_desc`, `difficulty`).  
2. **GET /challenges/:id** — Detail.  
3. **POST /challenges** — Create.  
4. **PUT /challenges/:id** — Update.  
5. **DELETE /challenges/:id** — Delete.

---

### Hackathons
1. **GET /hackathons** — List (`h_title`, `h_desc`, `h_date`, `h_status`, `creator`).  
2. **GET /hackathons/:id** — Detail.  
3. **POST /hackathons** — Create.  
4. **PUT /hackathons/:id** — Update.  
5. **DELETE /hackathons/:id** — Delete.

---

### Special Queries
- **/events?from=YYYY-MM-DD&to=YYYY-MM-DD** — events in date range.  
- **/challenges?difficulty=hard** — filter challenges by difficulty.  
- **/hackathons?status=running** — filter hackathons by status.  
- **/groups?creator=:id_user** — groups created by a given user.

---

### Available Endpoints (Summary)

| Method | Path | Description |
|---|---|---|
| POST | /users/login | Authentication (creates session) |
| POST | /users/logout | Ends session |
| GET | /users/me | Session user |
| GET | /users | List users |
| GET | /users/:id | User detail |
| POST | /users | Create user |
| PUT | /users/:id | Update user |
| DELETE | /users/:id | Delete user |
| GET | /groups | List groups |
| GET | /groups/:id | Group detail |
| POST | /groups | Create group |
| PUT | /groups/:id | Update group |
| DELETE | /groups/:id | Delete group |
| GET | /events | List events |
| GET | /events/:id | Event detail |
| POST | /events | Create event |
| PUT | /events/:id | Update event |
| DELETE | /events/:id | Delete event |
| GET | /challenges | List challenges |
| GET | /challenges/:id | Challenge detail |
| POST | /challenges | Create challenge |
| PUT | /challenges/:id | Update challenge |
| DELETE | /challenges/:id | Delete challenge |
| GET | /hackathons | List hackathons |
| GET | /hackathons/:id | Hackathon detail |
| POST | /hackathons | Create hackathon |
| PUT | /hackathons/:id | Update hackathon |
| DELETE | /hackathons/:id | Delete hackathon |

---

## Frontend Routes (SPA)

- `#/login` — sign‑in  
- `#/dashboard` — main dashboard  
- `#/retos` — challenges list  
- `#/clan` — groups/clans  
- `#/eventos` — mentoring/workshops  
- `#/hackathons` — upcoming/running/finished  
- `#/perfil` — profile & logout

> Navigation uses **hash routing**. The sidebar provides shortcuts and logout.

---

## Primary User Flow

1. User opens `#/login` and submits credentials.  
2. Backend validates, creates a session, and returns the cookie.  
3. Frontend keeps minimal user info in `userStore` (no password).  
4. Each view fetches its lists (challenges, events, groups, hackathons).  
5. CRUD actions according to role/permissions.  
6. Logout from the sidebar → `POST /users/logout`.

---

## Error Handling
- Input validation with clear messages (`msg`/`error`).  
- 400/404 when data is missing or resource not found.  
- 401 if there is no session; 403 for insufficient permissions.  
- 500 with a generic message and server logging.

---

## Security
- **bcrypt** for passwords—never store plaintext.  
- **HTTP‑only cookies**, set `secure` and `sameSite` in production.  
- CORS restricted to `FRONTEND_URL`.  
- Parameterized SQL; sanitize inputs.  
- Sensitive values only in `.env`.

---

## Performance & Quality
- Vite for fast startup and efficient bundling.  
- Lazy loading by views/components.  
- Index columns used for filtering (`email`, `role`, `event_date`, `h_status`).  
- ESLint + Prettier (recommended).

---

## Deployment
- **Backend**: Node with PM2 or Docker; `SESSION_SECRET` and DB connection via env vars.  
- **Frontend**: `npm run build` and serve `/dist` from Nginx/CDN; set `VITE_API_URL`.  
- **Database**: backups & monitoring; enable SSL when applicable.

---

## Suggested Roadmap
- Fine‑grained roles (admin/mentor/student) for authorization.  
- Pagination and search in large lists.  
- File uploads for challenge/hackathon evidence.  
- Automated tests (FE: vitest, BE: supertest).  
- Internationalization (string layer).

---

## Contributing & Style
- Follow **Conventional Commits** (feat, fix, docs, refactor…).  
- Small PRs with lint passing.  
- Document new routes in this guide.

---

## License
Not specified.
