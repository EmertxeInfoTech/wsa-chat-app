import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    fromClerkId: {type: String},
    toClerkId: {type: String},
    from:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"User",
       required: true, 
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    text:{ 
        type: String
    },
    image:{ 
        type: String,
    },
},
{
    timestamps: true
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;