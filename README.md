# Veterinary Ambulance

A monorepo application for managing veterinarians and pets, built with Node.js, Express, Prisma, PostgreSQL, React, and TypeScript.

## Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Docker and Docker Compose

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vet_ambulance
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=vet_ambulance
PORT=3001
NODE_ENV=development
```

3. Start the database and pgAdmin:

```bash
docker compose up -d db pgadmin
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed the database:

```bash
npm run prisma:seed
```

## Running the Application

### Development Mode

Start the API server:

```bash
npm run dev:api
```

The API will be available at `http://localhost:3001`
API documentation (Swagger) is available at `http://localhost:3001/api-docs`

Start the web application:

```bash
npm run dev:web
```

The web application will be available at `http://localhost:5173`

### Docker Compose

To run everything with Docker Compose:

```bash
docker compose up -d
```

## Useful Commands

- `npm run dev:api` - Start API development server
- `npm run dev:web` - Start web development server
- `npm run build:api` - Build API for production
- `npm run build:web` - Build web app for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database

## Access Points

- **Web Application**: http://localhost:5173
- **API Server**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)

