import {requireAuth} from "@clerk/express";
import express from "express";
import { getMessages, sendMessages, upload } from "../controllers/messageController.js";

const messageRoutes = express.Router();

messageRoutes.get("/:id",requireAuth(), getMessages); //:id --> accessing values from api
messageRoutes.post("/send/:id", requireAuth(), upload.single("image"), sendMessages);

export default messageRoutes;