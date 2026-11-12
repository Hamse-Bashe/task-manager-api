import express from "express";

import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import uploadRouter from "./routes/upload.js";
import taskRouter from "./routes/tasks.js";

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { limiter } from "./middlewares/rateLimiter.js";

const app = express();

// middleware
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/upload", uploadRouter);
app.use("/tasks", taskRouter);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(limiter);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://dugsiiye.com"],
  }),
);

// Custom middleware
// app.use(logger);

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

// Sample in-memory data
let users = [
  { id: 1, name: "Ayaan" },
  { id: 2, name: "Fatima" },
  { id: 3, name: "Zubeyr" },
];

// GET
app.get("/", (req, res) => {
  res.json(users);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// last route-level middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

// // POST
// app.post("/users", (req, res) => {
//   //   const userData = req.body;
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//   };

//   //   add new user to users array
//   users.push(newUser);

//   res.status(201).json(newUser);
// });

// // GET user info
// app.get("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (!user) return res.status(404).send("User not found");

//   res.json(user);
// });

// // PUT
// app.put("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (!user) return res.status(404).send("User not found");

//   user.name = req.body.name;
//   res.json(user);
// });

// // DELETE
// app.delete("/users/:id", (req, res) => {
//   users = users.filter(user => user.id != req.params.id)
//   res.send(`User ${req.params.id} deleted.`);
// });

// connect to database
mongoose
  .connect(
    process.env.NODE_ENV == "developmentt"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("✅ MongoDb connected locally."))
  .catch((err) => console.log(`❌ Connection error: ${err}`));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost/${PORT}`);
});
