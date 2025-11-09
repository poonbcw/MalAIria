# FROM node:22-alpine3.19 AS base
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY . .
# RUN npm ci
# RUN npm run build
# ENV NODE_ENV production
# ENV PORT 3000
# EXPOSE 3000
# CMD ["npm", "run", "start"]

# ---------- Build Stage ----------
FROM node:22-alpine3.19 AS builder
WORKDIR /app

# ติดตั้ง library ที่จำเป็น
RUN apk add --no-cache libc6-compat tzdata

# copy ไฟล์ package ก่อน เพื่อ cache layer
COPY package*.json ./

# ติดตั้ง dependencies (รวม dev เพราะต้อง build)
RUN npm ci

# copy source code ทั้งหมด
COPY . .

# build project → ได้โฟลเดอร์ dist/
RUN npm run build


# ---------- Production Stage ----------
FROM node:22-alpine3.19 AS production
WORKDIR /app

# ติดตั้ง library ที่จำเป็น
RUN apk add --no-cache libc6-compat tzdata

# copy ไฟล์ package
COPY package*.json ./

# ติดตั้งเฉพาะ production dependencies
RUN npm ci --omit=dev

# copy build result จาก builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# ตั้งค่า environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# สั่งรัน server
CMD ["npm", "run", "start"]
