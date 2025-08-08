import express from "express";
import {
  getUsersForSidebar,
  handleClerkWebhook,
} from "../controllers/userController.js";
import bodyParser from "body-parser";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

userRouter
  .route("/webhook")
  .post(bodyParser.raw({ type: "application/json" }), handleClerkWebhook);

userRouter.route("/getall").get(requireAuth(), getUsersForSidebar);

export default userRouter;
