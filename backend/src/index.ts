import { AppDataSource } from "./data-source.js";
import dotenv from "dotenv";
import express from "express";
import { User } from "./entity/User.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);

app.use(cors());
app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    res.set("Cache-Control", "no-store");
  } else {
    res.set("Cache-Control", "no-cache");
  }
  next();
});

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;
    const users = await manager.find(User);
    app.get("/", (_, res) => {
      res.send(users);
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
