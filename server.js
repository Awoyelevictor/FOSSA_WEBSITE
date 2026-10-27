import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import adminHandler from "./api/admin.js";
import profileHandler from "./api/auth/profile.js";
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.all("/api/auth/profile", profileHandler);
  app.all("/api/admin", adminHandler);
  app.all("/api/admin/*", adminHandler);
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`FOSSA server listening on port ${PORT}`));
}
startServer();