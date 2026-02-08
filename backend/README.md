# Setup

- Make `.env` from `.env.example`
- `npm i`

# Sync database

# 1. บันทึกความเปลี่ยนแปลงลง Database (สร้างคอลัมน์ hn)
npx prisma migrate dev --name add_hn_to_analysis

# 2. สร้าง Prisma Client ใหม่เพื่อให้ TypeScript รู้จักฟิลด์ hn
npx prisma generate

# Dev operations

- Start dev
  - `npm run dev`
- Build
  - `npm run build`
- Start production
  - `npm run start`

# Containerization and test

- Make `.env.test` from `.env.test.example`
- `docker compose --env-file ./.env.test up -d --force-recreate --build`

# Push to dockerhub

- `docker tag preflight-backend [DOCKERHUB_ACCOUNT]/preflight-backend:latest`
- `docker push [DOCKERHUB_ACCOUNT]/preflight-backend:latest`
