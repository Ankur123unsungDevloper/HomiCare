import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import { clerkMiddleware, getAuth } from "@clerk/express";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);

app.use(clerkMiddleware());

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "HomiCare API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/db-check", async (_req, res) => {
  try {
    const userCount = await prisma.user.count();

    res.status(200).json({
      success: true,
      message: "Database connection successful",
      userCount,
    });
  } catch (error) {
    console.error("Database check failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});


app.get("/api/protected", (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please sign in.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "You are authenticated!",
    userId,
  });
});

export default app;