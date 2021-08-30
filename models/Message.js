import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    message:String,
    user:{
        type:Object,
        _id:mongoose.Schema.Types.ObjectId,
        username:String,
        profileimage:String,
        ref:'User'
    }
})

const Message = new mongoose.model('Message', messageSchema);

export {Message};