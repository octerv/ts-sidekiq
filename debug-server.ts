import express, { Request, Response } from "express";
import cors from "cors";
import {
  getSidekiqQueueJobs,
  getSidekiqRetryJobs,
  getSidekiqData,
  removeSidekiqRetryJob,
} from "./src/redis-client";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/sidekiq", async (req: Request, res: Response) => {
  const data = await getSidekiqData();
  res.json(data);
});

app.post("/sidekiq/queue", async (req: Request, res: Response) => {
  const queueName = req.body.queueName;
  if (!queueName) {
    return res.status(400).send("queueName is required");
  }

  const data = await getSidekiqQueueJobs(queueName);
  res.json(data);
});

app.get("/sidekiq/retry", async (req: Request, res: Response) => {
  const data = await getSidekiqRetryJobs();
  res.json(data);
});

app.post("/sidekiq/retry/delete", async (req: Request, res: Response) => {
  const jids = req.body.jids;
  if (!jids || jids.length === 0) {
    return res.status(400).send("jids array is required");
  }

  try {
    await removeSidekiqRetryJob(jids);
  } catch (error) {
    console.error("Error removing job from retry:", error);
    res.status(500).send("Failed to remove job from retry queue");
  }

  const data = await getSidekiqRetryJobs();
  res.json(data);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
