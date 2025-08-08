import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    clerkUserId:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type: String,
        required: true,
    },
    userName: { 
        type: String, 
        //required: true, 
        trim: true,
    },
    firstName: { 
        type: String,  
        trim: true,
        required: true
    },
    lastName: { 
        type: String,  
        trim: true,
    },
    profileImage:{
        type:String,
    }, 
},
 {timestamps: true}
);
const User = mongoose.model("User", UserSchema);

export default User;