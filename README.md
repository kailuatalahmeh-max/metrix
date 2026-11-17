# Metrix

A small app to save my work jobs (customer, product, region, meters)
and see my statistics, so I can compare them with my accountant.

| Folder       | What it is                                            | Port |
| ------------ | ----------------------------------------------------- | ---- |
| `metrix-web` | Website — React 19 (Vite), TypeScript, Zustand, Tailwind | 3000 |
| `metrix-api` | API — NestJS, TypeScript, Prisma 7                    | 3001 |
| (Docker)     | Database — PostgreSQL 18                              | 5432 |

## What you need

- **Node.js 24.15 or newer** (`node -v`)
- **Docker Desktop** (to run PostgreSQL) — https://www.docker.com/products/docker-desktop/
- **Git**

## First time setup

```bash
# 0. Get the code
git clone https://github.com/kailuatalahmeh-max/metrix.git
cd metrix

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

## Website pages

| Page          | URL              | What it shows                                                      |
| ------------- | ---------------- | ------------------------------------------------------------------ |
| Dashboard     | `/`              | Meters and jobs since the last payment, last 5 jobs, record a payment |
| Workshops     | `/workshops`     | Table of all jobs, with a delete button                            |
| Add workshop  | `/workshops/new` | Form to save a new job                                             |
| Not found     | any other URL    | 404 page with a link back to the dashboard                         |

### Languages

The website supports **English** (left to right) and **Arabic** (right to left).

- Use the button in the top menu to change the language.
- The choice is saved in the browser (`localStorage`, key `metrix-language`), so it stays after refresh.
- All texts are in `src/i18n/locales/en.ts` and `ar.ts`. If you add a text in `en.ts`, add it in `ar.ts` too — TypeScript shows an error if you forget.

## API routes

| Method | Route                   | What it does                                          |
| ------ | ----------------------- | ----------------------------------------------------- |
| POST   | `/workshop`             | Save a new job                                        |
| GET    | `/workshop`             | Get all jobs, newest first                            |
| DELETE | `/workshop/:workshopId` | Delete one job (404 if it does not exist)             |
| POST   | `/payment`              | Save a payment                                        |
| GET    | `/statistics`           | Get total meters and job count since the last payment |

Example body for `POST /workshop`:

```json
{
  "customerName": "Ali",
  "productName": "Marble",
  "region": "Amman",
  "meters": 12.5
}
```

- `customerName`, `productName`, `region`: text, not empty, max 100 characters.
- `meters`: a positive number, max 2 decimal places.

Example body for `POST /payment` (`amount` is optional):

```json
{
  "amount": 150
}
```

Example answer from `GET /statistics`:

```json
{
  "success": true,
  "data": {
    "totalMeters": 37.5,
    "workshopCount": 3,
    "lastPayment": "2026-11-10T09:30:00.000Z"
  }
}
```

`lastPayment` is `null` if there is no payment yet.

**Rules in the API:**

- Wrong or unknown fields in the body return a **400** error (`ValidationPipe`).
- Each user can send **30 requests per minute**. After that, the API returns a **429** error (`ThrottlerGuard`).
- Database errors are changed to clear HTTP errors (`PrismaErrorFilter`):
  not found → **404**, duplicate → **409**, database is down → **503**.

## Database tables

| Table      | Fields                                                               |
| ---------- | -------------------------------------------------------------------- |
| `Workshop` | `id`, `customerName`, `productName`, `region`, `meters`, `createdAt` |
| `Payment`  | `id`, `amount`, `createdAt`                                          |

`createdAt` is saved automatically.

## Project folders

```
metrix/
├── docker-compose.yml          → runs PostgreSQL in Docker
├── metrix-api/
│   ├── prisma/
│   │   ├── schema.prisma       → the tables
│   │   └── migrations/         → history of database changes
│   ├── prisma.config.ts        → Prisma settings (reads .env)
│   └── src/
│       ├── main.ts             → the API starts here
│       ├── app.module.ts       → connects all modules
│       ├── common/filters/     → turns Prisma errors into HTTP errors
│       ├── prisma/             → connection to the database
│       ├── workshop/           → jobs
│       ├── payment/            → payments
│       └── statistics/         → statistics
└── metrix-web/
    ├── index.html              → the only HTML page
    ├── vite.config.ts          → Vite settings (port 3000, "@" = src)
    └── src/
        ├── main.tsx            → the website starts here
        ├── App.tsx             → the routes (which page for which URL)
        ├── index.css           → global styles
        ├── components/Layout/  → top menu + language button
        ├── pages/              → one folder for each page (.tsx + .module.css)
        ├── store/              → Zustand stores (talk to the API, save the language)
        ├── i18n/               → English and Arabic texts
        ├── api/handleError.ts  → shows an error message (toast)
        └── types/              → TypeScript types
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

## Save your work to GitHub

```bash
git status                  # see what changed
git add .                   # choose all changes
git commit -m "Short message"
git push                    # send to GitHub
```

## Stop the database

```bash
docker compose down         # stops it, your data is kept
docker compose down -v      # stops it and DELETES all data
```
