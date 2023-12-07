import express, { Request, Response } from "express";
import cors from "cors";
import { getSidekiqData } from "./src/redis-client";

const app = express();
app.use(cors());

app.get("/sidekiq", async (req: Request, res: Response) => {
  const data = await getSidekiqData();
  console.log(JSON.stringify(data));
  res.json(data);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
