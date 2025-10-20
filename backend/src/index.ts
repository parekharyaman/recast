import { AppDataSource } from "./data-source.js";
import dotenv from "dotenv";
import express from "express";
import { User } from "./entity/User.js";
import cors from "cors";
import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);

// Configure CORS to allow credentialed requests from the frontend
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;
    app.get("/", async (_, res) => {
      const users = await manager.find(User);
      res.send(users);
    });
    app.get("/user", async (req, res) => {
      // Use `getAuth()` to access `isAuthenticated` and the user's ID
      const { isAuthenticated, userId } = getAuth(req);

      // If user isn't authenticated, return a 401 error
      if (!isAuthenticated) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Use `clerkClient` to access Clerk's JS Backend SDK methods
      // and get the user's User object
      const user = await clerkClient.users.getUser(userId);

      res.json(user);
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
