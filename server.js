import express from "express";
import path from "path";
import { randomUUID } from "node:crypto";
import { createServer as createViteServer } from "vite";
import adminHandler from "./api/admin.js";
import profileHandler from "./api/auth/profile.js";
import academicHandler from "./api/academic.js";
import publicContentHandler from "./api/public-content.js";
import lecturerHandler from "./api/lecturer.js";
import lecturerUploadHandler from "./api/lecturer-upload.js";
import electionsHandler from "./api/elections.js";
import eventsHandler from "./api/events.js";
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);
  let shuttingDown = false;
  let electionFinalizerTimer = null;
  let electionFinalizerRunning = false;
  app.disable("x-powered-by");
  app.use((req, res, next) => {
    if (!req.path.startsWith("/api/")) return next();
    const requestId = randomUUID();
    const startedAt = Date.now();
    res.setHeader("X-Request-Id", requestId);
    res.on("finish", () => console.log(JSON.stringify({ type: "api_request", requestId, method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - startedAt })));
    next();
  });
  app.use(express.json({ limit: "1mb" }));
  const health = (_req, res) => { res.setHeader("Cache-Control", "no-store"); res.json({ status: "ok", uptimeSeconds: Math.floor(process.uptime()), timestamp: new Date().toISOString() }); };
  app.get("/health", health);
  app.get("/api/health", health);
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
  app.all("/api/events", eventsHandler);
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }
  const server = app.listen(PORT, "0.0.0.0", () => console.log("FOSSA server listening on port " + PORT));
  const runElectionFinalizer = async () => {
    if (shuttingDown || electionFinalizerRunning) return;
    electionFinalizerRunning = true;
    try {
      const response = await fetch("http://127.0.0.1:" + PORT + "/api/elections", { signal: AbortSignal.timeout(10000) });
      if (!response.ok) console.error("Election finalization check returned HTTP", response.status);
    } catch (error) { if (!shuttingDown) console.error("Election finalization check failed:", error?.message || error); }
    finally {
      electionFinalizerRunning = false;
      if (!shuttingDown) { electionFinalizerTimer = setTimeout(runElectionFinalizer, 30000); electionFinalizerTimer.unref?.(); }
    }
  };
  server.once("listening", () => { electionFinalizerTimer = setTimeout(runElectionFinalizer, 30000); electionFinalizerTimer.unref?.(); });
  const shutdown = signal => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log("FOSSA server received " + signal + "; beginning graceful shutdown.");
    if (electionFinalizerTimer) clearTimeout(electionFinalizerTimer);
    server.close(error => { if (error) { console.error("FOSSA server shutdown error:", error); process.exitCode = 1; } });
    const forceCloseTimer = setTimeout(() => server.closeAllConnections?.(), 10000);
    forceCloseTimer.unref?.();
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}
startServer().catch(error => { console.error("FOSSA server failed to start:", error); process.exitCode = 1; });
