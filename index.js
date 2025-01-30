import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import nibbleRoute from "./routes/nibble.routes.js";
import compression from "compression";
import cluster from "cluster";
import os from "os";

const app = express();
// Middlewares

app.use(
  cors({
    origin: "https://nibbleapp.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/nibble", nibbleRoute);

// Error Middleware
app.use(errorMiddleware);

connectDB();

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}

export default app;
