import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webHookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = express();
app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);
app.use(express.json());

// app.get("/test", (req, res) => {
//   res.status(200).send("it works!");
// });

// app.get("/auth-state", (req, res) => {
//   const autState = req.auth;
//   res.json(autState);
// });

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json("not authenticated");
//   }
//   res.status(200).json("content");
// });

// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content");
// });

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// try handle for eror
app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running...");
});

// 2:16
