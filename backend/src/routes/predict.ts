import { Router } from "express";
import prisma from "../lib/prisma";
import { spawn } from "child_process";
import path from "path";

const router = Router();

/**
 * Predict by model
 */
router.post("/", async (req, res) => {
  const { userId, imagePath, modelUsed } = req.body;

  const absoluteImagePath = path.join(
    __dirname,
    "../../",
    imagePath
  );

  try {
    // เรียก python model
    const python = spawn("python", [
      "model/predict.py",
      absoluteImagePath,
    ]);

    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.on("close", async () => {
      /**
       * สมมติ python return:
       * { "result": "Positive", "confidence": 0.92 }
       */
      const parsed = JSON.parse(output);

      // สร้าง Analysis
      const analysis = await prisma.analysis.create({
        data: {
          userId,
          modelUsed,
          result: parsed.result,
          confidence: parsed.confidence,
        },
      });

      // บันทึกภาพ
      await prisma.imageUpload.create({
        data: {
          analysisId: analysis.id,
          filename: imagePath.split("/").pop()!,
          imageUrl: imagePath,
        },
      });

      res.json({
        analysisId: analysis.id,
        result: parsed.result,
        confidence: parsed.confidence,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction failed" });
  }
});

export default router;
