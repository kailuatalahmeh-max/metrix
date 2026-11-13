# Metrix

A small app to save my work jobs (customer, product, region, meters)
and see my statistics, so I can compare them with my accountant.

| Folder       | What it is                                   | Port |
| ------------ | -------------------------------------------- | ---- |
| `metrix-web` | Website — React (Vite), TypeScript, Zustand  | 3000 |
| `metrix-api` | API — NestJS, TypeScript, Prisma             | 3001 |
| (Docker)     | Database — PostgreSQL 18                     | 5432 |

## What you need

- **Node.js 24.15 or newer** (`node -v`)
- **Docker Desktop** (to run PostgreSQL) — https://www.docker.com/products/docker-desktop/

## First time setup

```bash
# 1. Start the database
docker compose up -d

# 2. Set up the API
cd metrix-api
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
npm install                 # also runs "prisma generate"
npm run prisma:migrate      # creates the tables in the database

# 3. Set up the website
cd ../metrix-web
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
npm install
```

## Run the project (every day)

Make sure the database is running: `docker compose up -d`.

Then open **two terminals**:

```bash
# Terminal 1 — API
cd metrix-api
npm run start:dev           # http://localhost:3001
```

```bash
# Terminal 2 — Website
cd metrix-web
npm run dev                 # http://localhost:3000
```

## API routes

| Method | Route                      | What it does                                        |
| ------ | -------------------------- | --------------------------------------------------- |
| POST   | `/workshop/create-workshop` | Save a new job                                      |
| GET    | `/workshop`                | Get all jobs, newest first                          |
| POST   | `/payment`                 | Save a payment                                      |
| GET    | `/statistics`              | Get total meters and job count since the last payment |

Example body for `POST /workshop/create-workshop`:

```json
{
  "customerName": "Ali",
  "productName": "Marble",
  "region": "Amman",
  "meters": 12.5
}
```

Example body for `POST /payment` (`amount` is optional):

```json
{
  "amount": 150
}
```

**Rules in the API:**

- Unknown fields in the body return a **400** error (`ValidationPipe`).
- Each user can send **30 requests per minute**. After that, the API returns a **429** error (`ThrottlerGuard`).

## Database tables

| Table      | Fields                                                            |
| ---------- | ----------------------------------------------------------------- |
| `Workshop` | `id`, `customerName`, `productName`, `region`, `meters`, `createdAt` |
| `Payment`  | `id`, `amount`, `createdAt`                                       |

`createdAt` is saved automatically.

## Project folders

```
metrix/
├── docker-compose.yml        → runs PostgreSQL in Docker
├── metrix-api/
│   ├── prisma/
│   │   ├── schema.prisma     → the tables
│   │   └── migrations/       → history of database changes
│   └── src/
│       ├── main.ts           → the API starts here
│       ├── app.module.ts     → connects all modules
│       ├── prisma/           → connection to the database
│       ├── workshop/         → jobs
│       ├── payment/          → payments
│       └── statistics/       → statistics
└── metrix-web/
    ├── index.html            → the only HTML page
    └── src/
        ├── main.tsx          → the website starts here
        ├── App.tsx           → the data entry page
        ├── index.css         → styles
        └── store/            → Zustand store (sends data to the API)
```

## Useful commands

Inside `metrix-api`:

| Command                   | What it does                                            |
| ------------------------- | ------------------------------------------------------- |
| `npm run start:dev`       | Start the API, restart after each code change           |
| `npm run build`           | Build the API                                           |
| `npm test`                | Run the tests                                           |
| `npm run prisma:migrate`  | After you change `schema.prisma`: update the database   |
| `npm run prisma:generate` | Create the TypeScript client again                      |
| `npm run prisma:studio`   | Open a website to see and edit the data in the database |

Inside `metrix-web`:

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the website                    |
| `npm run build` | Make the production files in `dist/` |
| `npm run lint`  | Check the code                       |

## Stop the database

```bash
docker compose down         # stops it, your data is kept
docker compose down -v      # stops it and DELETES all data
```
