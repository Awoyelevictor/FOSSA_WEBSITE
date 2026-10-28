import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import adminHandler from "./api/admin.js";
import profileHandler from "./api/auth/profile.js";
import academicHandler from "./api/academic.js";
import publicContentHandler from "./api/public-content.js";
import lecturerHandler from "./api/lecturer.js";
import lecturerUploadHandler from "./api/lecturer-upload.js";
import electionsHandler from "./api/elections.js";
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.all("/api/auth/profile", profileHandler);
  app.all("/api/academic", academicHandler);
  app.all("/api/academic/*", academicHandler);
  app.all("/api/admin", adminHandler);
  app.all("/api/admin/*", adminHandler);
  app.all("/api/public/content", publicContentHandler);
  app.all("/api/lecturer", lecturerHandler);
  app.all("/api/lecturer/upload", lecturerUploadHandler);
  app.all("/api/elections", electionsHandler);
  app.all("/api/elections/*", electionsHandler);
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => console.log(`FOSSA server listening on port ${PORT}`));
  // Finalize elections after their voting deadline even if no student is viewing the scoreboard.
  const electionFinalizer = setInterval(() => {
    fetch(`http://127.0.0.1:${PORT}/api/elections`).catch(error => console.error("Election finalization check failed:", error?.message || error));
  }, 30000);
  electionFinalizer.unref?.();
}
startServer();
