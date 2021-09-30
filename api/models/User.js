import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    status:{
        type:String,
        default:"offline"
    },
    username:{
        type:String,
        required:true,
        unique:[true,"username already exists!!"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:true,
        unique:[true,"password already exists"],
        minlength:7
    },
    profileimage:{
        type:String,
    },
    friends:[
        {
            _id:mongoose.Schema.Types.ObjectId,
            username:String,
            profileimage:String,
            // unique:[true,"friend already exists!!!"]
        }
    ],
    friendRequests:[{
        _id:mongoose.Schema.Types.ObjectId,
        username:String,
        profileimage:String,
        // unique:[true,"frinedRequest already exists!!!"]
    }],
    notifications:[{
        name:String,
        img:String,
        text:String,
        typeof:String
    }],
    chats:[
        {
            _id:mongoose.Schema.Types.ObjectId,
            roomname:String,
        }    
    ]
})


const User = new mongoose.model('User',userSchema);


export {User};