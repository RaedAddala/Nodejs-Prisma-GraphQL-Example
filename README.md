# NodeJs-Prisma-GraphQL-Example

Example made with NodeJs, Prisma, GraphQL for a Course Lab.

## How to build this project

- start database server: `docker-compose up`
- create the `.env` file and copy its content from the `.env.example` and change the placeholders.
- install packages: `npm install`.
- start prisma: `npx prisma generate`.
- commit prisma migration: `npx prisma migrate dev`.
- apply prisma seed: `npx prisma db seed`.
- Run the server: `npm run dev`.
