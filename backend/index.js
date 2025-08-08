import "dotenv/config";
// import app from "./app.js";
import connectDB from "./db/db.js";
import { server } from "./libs/socket.js";

const PORT = process.env.PORT || 7001;

connectDB()
  .then(
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!!`);
    })
  )
  .catch((err) => console.log("MongoDB connection error!", err));
