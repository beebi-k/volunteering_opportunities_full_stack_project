import express from 'express';
import { initDB } from './config/db.js';
import { seedData } from './config/seed.js';
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import orgRoutes from "./routes/org.routes.js";
import oppRoutes from "./routes/opp.routes.js";
import appRoutes from "./routes/app.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Initialize Database
  initDB();
  await seedData();

  const app = express();
  
  // FIX: Use Render's dynamic port or default to 3000
  const PORT = process.env.PORT || 3000;

  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(cors());
  app.use(express.json());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
  });

  app.use("/api/", limiter);

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/organizations", orgRoutes);
  app.use("/api/opportunities", oppRoutes);
  app.use("/api/applications", appRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Logic for Production vs Development
  if (process.env.NODE_ENV === "production") {
    // FIX: Ensure static files are served from the correct absolute path
    const buildPath = path.resolve(__dirname, "dist");
    app.use(express.static(buildPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  // FIX: Listen on PORT variable and 0.0.0.0 for external access
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 VolunteerHub Server is ready!`);
    console.log(`📡 Port: ${PORT}`);
  });
}

startServer();