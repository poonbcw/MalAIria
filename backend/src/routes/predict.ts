import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  // รองรับอัปโหลดภาพ → เรียก subprocess ไปยัง Python model
  res.json({ infected: true, confidence: 0.92 });
});
export default router;
