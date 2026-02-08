// src/routes/auth.ts
import { Router } from "express";
import admin from "../lib/firebaseAdmin";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    // ✅ verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    if (!email) {
      return res.status(400).json({ error: "No email from Google" });
    }

    // ✅ upsert user ลง Prisma
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        avatar: picture,
      },
      create: {
        id: uid,
        email,
        name,
        avatar: picture,
        provider: "google",
      },
    });

    res.json({ user });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
