import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  createdAt:{
    type:Number,
    default:new Date().getTime()
  },
  creatorName:{
    type:String,
    ref:'User'
  },
  creatorImg:{
    type:String,
    ref:'User'
  },
  imgsrc: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes:[],
  dislikes:[],
  comments: [
    {
      commentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    },
  ],
});

const Post = new mongoose.model("Post", postSchema);
export {Post};
