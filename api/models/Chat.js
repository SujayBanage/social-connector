import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    roomname:{
        type:String,
        unique:true,
    },
    users:[{
        _id:mongoose.Schema.Types.ObjectId,
        username:String,   
        profileimage:String,
        status:String,
    }],
    messages:[],
    chatType:String,
})


const Chat = new mongoose.model('Chat',chatSchema);

export { Chat};