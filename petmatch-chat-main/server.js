import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import messageRoute from "./routes/message.route.js";
import { socketHandler } from "./socket/socket.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoute);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PetMatch Chat Server Running"
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔥 MongoDB Connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB Error:", error.message);
  });

// Create HTTP Server
const httpServer = createServer(app);

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

// Start Server
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});