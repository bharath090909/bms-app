import express from "express";
import { prisma } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/signup", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
