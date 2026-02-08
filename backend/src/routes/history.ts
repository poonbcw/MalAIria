import { Router } from "express";
import prisma from "../lib/prisma"; // ตรวจสอบ path ของ prisma client

const router = Router();

router.get("/", async (req, res) => {
  try {
    const history = await prisma.analysis.findMany({
      include: {
        images: true, // ดึงข้อมูลรูปภาพจาก ImageUpload มาด้วย
      },
      orderBy: {
        createdAt: "desc", // เอาข้อมูลล่าสุดขึ้นก่อน
      },
    });
    res.json(history);
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;