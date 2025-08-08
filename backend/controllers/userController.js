import { Webhook } from "svix";
import User from "../models/userModel.js";

const handleClerkWebhook = async (req, res) => {
  console.log("UserCreation Route");
  try {
    const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY;
    if (!CLERK_WEBHOOK_SECRET_KEY) {
      res.status(500).json({ success: false, message: "server Error" });
    }

    //Extract the request body, which contain the webhook data sent by the clerk
    const payload = req.body;
    //Extract the Http headers from the request, these headers contain the signature that will be used to verify the webhooks
    const headers = req.headers;

    const wh = new Webhook(CLERK_WEBHOOK_SECRET_KEY);

    let evt = wh.verify(payload, headers);
    const { id, ...attributes } = evt.data;
    // console.log(id);
    // console.log(attributes);

    const eventType = evt.type;
    // console.log(eventType);

    //Create a user in Mongodb
    if (eventType === "user.created") {
      try {
        console.log("hello");
        //find if any user exist using id
        const userExists = await User.findOne({ clerkUserId: id });
        //create a new user
        if (userExists) {
          return res
            .status(400)
            .json({ success: false, message: "user already Exists" });
        }

        const newUser = new User({
          clerkUserId: id,
          email: attributes.email_addresses[0].email_address,
          userName: attributes.username || "",
          firstName: attributes.first_name || "",
          lastName: attributes.last_name || "",
          proileImage: attributes.image_url || "",
        });

        //save the new user to mongodb
        console.log(newUser);
        await newUser.save();
        res.status(200).json({ success: true, message: "User Created" });
      } catch (error) {
        res.status(400).json({ success: false, message: "user not created" });
      }
    }

    // Update the user in MongoDB
    if (eventType === "user.updated") {
      try {
        //Find the user with the id
        const updateUser = await User.updateOne(
          { clerkUserId: id },
          {
            $set: {
              email: attributes.email_addresses[0].email_address,
              firstName: attributes.first_name,
              lastName: attributes.last_name,
              userName: attributes.username,
              proileImage: attributes.image_url,
            },
          }
        );
        // validate
        if (updateUser.modifiedCount > 0) {
          console.log(`User with clerkUserId(${id}) updated successfully`);
        } else {
          console.log(`No user with clerkUserId(${id})`);
        }
        res
          .status(200)
          .json({ success: true, message: "User updated successfully" });

        //update the feilds
      } catch (error) {
        res.status(400).json({ success: false, message: "User not Updated" });
      }
    }
    if (eventType === "user.deleted") {
      try {
        const deletedUser = await User.deleteOne({ clerkUserId: id });
        if (deletedUser.deletedCount > 0) {
          console.log(`User with clerkUserId ${id} deleted successfully`);
          res
            .status(200)
            .json({ success: true, message: "User deleted successful" });
        } else {
          console.log(
            `No user found with clerkUserId: ${id}, nothing to delete`
          );
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Something went wrong, while deleting",
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: `Webhook Error: ${error} ` });
  }
};
//getUsers for Sidebar
const getUsersForSidebar = async (req, res) => {
  try {
    const currentUser = req.auth?.userId;

    const filteredUsers = await User.find({
      clerkUserId: { $ne: currentUser },
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export { handleClerkWebhook, getUsersForSidebar };
