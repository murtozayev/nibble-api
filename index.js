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

const allowedOrigins = [
  "http://localhost:5173",
  "https://nibbleapp.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
