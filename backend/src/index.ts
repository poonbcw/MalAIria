import "dotenv/config";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";

import uploadRoutes from "./routes/upload";
import predictRoutes from "./routes/predict";

//Intializing the express app
const app = express();

//Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ เปิดให้ frontend เข้ามา
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/predict", predictRoutes);

// JSON Error Middleware
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let serializedError = JSON.stringify(err, Object.getOwnPropertyNames(err));
  serializedError = serializedError.replace(/\/+/g, "/");
  serializedError = serializedError.replace(/\\+/g, "/");
  res.status(500).send({ error: serializedError });
};
app.use(jsonErrorHandler);

// Running app
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
