// import { Router } from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { PrismaClient } from "@prisma/client";
// import { spawn } from "child_process";

// const router = Router();
// const prisma = new PrismaClient();
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });
//   const filepath = path.resolve(req.file.path);

//   // เรียก Python script วิเคราะห์
//   const python = spawn("python3", ["path/to/model_inference.py", filepath]);

//   let resultData = "";
//   python.stdout.on("data", (data) => {
//     resultData += data.toString();
//   });

//   python.on("close", async (code) => {
//     // ลบไฟล์อัพโหลดทิ้งหลังวิเคราะห์เสร็จ
//     fs.unlinkSync(filepath);

//     if (code !== 0) {
//       return res.status(500).json({ error: "Model inference failed" });
//     }

//     let resultJson;
//     try {
//       resultJson = JSON.parse(resultData);
//     } catch {
//       resultJson = { result: "unknown", confidence: 0 };
//     }

//     // บันทึกลงฐานข้อมูล
//     await prisma.imageUpload.create({
//       data: {
//         filename: req.file.filename,
//         result: resultJson.result,
//         confidence: resultJson.confidence,
//       },
//     });

//     res.json(resultJson);
//   });
// });

// router.get("/uploads", async (req, res) => {
//   const uploads = await prisma.imageUpload.findMany({
//     orderBy: { uploadedAt: "desc" },
//     take: 20,
//   });
//   res.json(uploads);
// });

// export default router;

import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { spawn } from "child_process";

const router = Router();
const prisma = new PrismaClient();

// ตั้งค่า multer ให้เก็บไฟล์ในโฟลเดอร์ /uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // ตั้งชื่อไฟล์แบบ timestamp + original name
      const uniqueName = Date.now() + "_" + file.originalname;
      cb(null, uniqueName);
    },
  }),
});

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filepath = req.file.path; // path จริงของไฟล์บน backend
  const filename = req.file.filename; // ชื่อไฟล์ที่เก็บจริง
  const relativePath = `/uploads/${filename}`; // path สำหรับเก็บ DB

  try {
    // บันทึก path ลง DB
    await prisma.imageUpload.create({
      data: {
        filename: relativePath,
      },
    });

    res.json({ message: "File uploaded", path: relativePath });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to save file info to DB" });
  }
  
  // // เรียก Python script วิเคราะห์
  // const python = spawn("python3", ["path/to/model_inference.py", filepath]);

  // let resultData = "";
  // python.stdout.on("data", (data) => {
  //   resultData += data.toString();
  // });

  // python.on("close", async (code) => {
  //   if (code !== 0) {
  //     // ถ้า Python error → ลบไฟล์ทิ้งแล้ว return
  //     fs.unlinkSync(filepath);
  //     return res.status(500).json({ error: "Model inference failed" });
  //   }

  //   let resultJson;
  //   try {
  //     resultJson = JSON.parse(resultData);
  //   } catch {
  //     resultJson = { result: "unknown", confidence: 0 };
  //   }

  //   // บันทึก path + result ลง DB
  //   await prisma.imageUpload.create({
  //     data: {
  //       filename: relativePath,
  //       result: resultJson.result,
  //       confidence: resultJson.confidence,
  //     },
  //   });

  //   // ✅ ไม่ลบไฟล์เลย ตอนนี้เก็บใน /uploads
  //   res.json({ path: relativePath, ...resultJson });
  // });
});

export default router;
