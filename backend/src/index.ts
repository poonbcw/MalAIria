import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path"; // แนะนำให้ใช้ path ปกติแทน path/win32 เพื่อความเสถียร

import uploadRoutes from "./routes/upload";
import predictRoutes from "./routes/predict";
import authRoutes from "./routes/auth";
import historyRoutes from "./routes/history"; // อย่าลืมสร้าง route นี้สำหรับดึงข้อมูล DB

const app = express();

// 1. แก้ไข Helmet: ปิด COEP หรือตั้งค่าให้ยอมรับ Cross-Origin
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // อนุญาตให้โหลดทรัพยากรข้ามค่าย
    crossOriginEmbedderPolicy: false, // ปิดนโยบายที่เข้มงวดเกินไปสำหรับรูปภาพ
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// 2. เพิ่มส่วนจัดการไฟล์รูปภาพ (สำคัญมาก!)
// ต้องระบุให้ถูกต้องเพื่อให้ http://localhost:3000/uploads/... เข้าถึงได้
app.use("/uploads", express.static(path.join(__dirname, "../uploads"), {
  setHeaders: (res) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
  },
}));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes); // สำหรับหน้า Dashboard ดึงประวัติ

// JSON Error Middleware
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({ error: "Internal Server Error" });
};
app.use(jsonErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});