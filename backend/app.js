import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Example - your frontend's origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // If you're using cookies or authorization headers
//     optionsSuccessStatus: 204,
//   })
// );
app.use(clerkMiddleware());

app.use("/api/users", userRouter);

app.use(express.json());

app.use("/api/messages", messageRoutes);

export default app;
