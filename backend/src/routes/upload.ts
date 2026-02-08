import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import prisma from "../lib/prisma"; // ตรวจสอบว่า path ถูกต้อง

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "_" + file.originalname;
      cb(null, uniqueName);
    },
  }),
});

/**
 * API: POST /api/upload
 * รับไฟล์ภาพ, บันทึกผลวิเคราะห์สุ่ม และเก็บลง DB
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. จำลองการวิเคราะห์ (Logic เดียวกับที่คุณต้องการ)
    const models = ["YOLOv8", "CNN-v2", "MobileNetV2", "Random Forest"];
    const results = ["Positive", "Negative"];
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const randomResult = results[Math.floor(Math.random() * results.length)];
    const randomConfidence = parseFloat(
      (Math.random() * (0.99 - 0.75) + 0.75).toFixed(2),
    );

    // 2. บันทึกลง Database ผ่าน Prisma
    // หมายเหตุ: userId ควรดึงจาก Auth middleware แต่ที่นี่ใส่ placeholder ไว้
    const analysis = await prisma.analysis.create({
      data: {
        userId: req.body.userId || "guest-user",
        hn: req.body.hn || null, // 🟢 บันทึก HN ลงไป
        modelUsed: req.body.model || randomModel,
        result: randomResult,
        confidence: randomConfidence,
        detectMetadata: {}, // Placeholder สำหรับ Bounding Box ในอนาคต
        images: {
          create: {
            filename: req.file.filename,
            imageUrl: `/uploads/${req.file.filename}`,
          },
        },
      },
      include: { images: true },
    });

    res.json(analysis);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ประวัติ


export default router;
