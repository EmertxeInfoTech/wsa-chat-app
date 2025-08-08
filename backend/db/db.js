import mongoose from "mongoose";
import "dotenv/config";

// const connectDB = mongoose.connect(process.env.MONGODB_URL)
// The above way is not as per INDUSTRY STANDARDS

const connectDB = async() =>{
    try{
       const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
       console.log("MongoDb is Connected! DB Host: ");
    }catch (error){
       console.log("MongoDB connection error!", error);
    }
}
export default connectDB;