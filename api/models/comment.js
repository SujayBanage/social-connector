import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text:{
      type:String,
    },
    postid:{
      type:String,
    },
    commentBy:{
      type:Object,
      _id:mongoose.Schema.Types.ObjectId,
      username:String,
      profileimage:String,
      ref:'User',
    },
    likes:[{
      _id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      username:String,
    }],
    dislikes:[{
      _id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      username:String,
    }],
    parent:{
      type:mongoose.Schema.Types.ObjectId,
      default:null,
      ref:'Comment'
    },
    children:[
        {
          replyBy:{
            _id:mongoose.Schema.Types.ObjectId,
            name:String,
            profileimage:String
          },
          text:String,      
        }
    ]
})


const Comment = new mongoose.model('Comment',commentSchema);
export {Comment};