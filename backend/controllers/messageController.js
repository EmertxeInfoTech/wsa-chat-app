import Message from "../models/messageModel.js";
import dotenv from "dotenv";
import ImageKit from "imagekit";
import User from "../models/userModel.js";
import multer from "multer";
import { getReciverSocketId, io } from "../libs/socket.js";

dotenv.config({ path: "../.env" });

//Configure middleware
const upload = multer({ storage: multer.memoryStorage() });

//Initialise imagekit

let imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;

  try {
    //Current Logged in User
    let currentUserId = req.auth?.userId;
    // let currentUserId = "user_2wWl1hnNTQC7eXbMwm1mD6nlGiL";

    //Find the messages based on the fromclerkId to toClerkId
    const messages = await Message.find({
      $or: [
        {
          fromClerkId: currentUserId,
          toClerkId: userToChatId,
        },
        {
          fromClerkId: userToChatId,
          toClerkId: currentUserId,
        },
      ],
    }).sort({ createdAt: 1 }); //1 for asc -> desc , -1 for desc -> asc
    // console.log("Get Messages: ", messages[0].text);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting message controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const sendMessages = async (req, res) => {
  // console.log(req);
  try {
    const { text } = req.body;
    const { id: toClerkId } = req.params;

    const fromClerkId = req.auth?.userId;

    // const fromClerkId = "user_2wWl1hnNTQC7eXbMwm1mD6nlGiL";

    if (!fromClerkId) {
      return res.status(400).json({ error: "Unauthorised User!" });
    }
    const fromUser = await User.findOne({ clerkUserId: fromClerkId });
    const toUser = await User.findOne({ clerkUserId: toClerkId });

    //Handling the images from Imagekit
    let imageUrl;
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64"); //add the file as a string and add to the base64
      const result = await imagekit.upload({
        file: base64Image,
        fileName: `${Date.now()}.jpg`,
        useUniqueFileName: true,
      });
      console.log(result);
      imageUrl = result.url;
    }

    const newMessage = await Message.create({
      fromClerkId,
      toClerkId,
      from: fromUser._id,
      to: toUser._id,
      text,
      image: imageUrl,
    });

    //socket.io part

    console.log("hit");

    const reciverSocketId = getReciverSocketId(toClerkId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }
    const senderSocketId = getReciverSocketId(fromClerkId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message  controller", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export { upload };
