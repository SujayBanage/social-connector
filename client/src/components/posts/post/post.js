import React, { useEffect, useState, useContext } from "react";
import Card from "../../../UIshared/card/card.js";
import { socketContext } from "../../../index.js";

const Post = (props) => {
  const socket = useContext(socketContext);
  const [state, setState] = useState({
    likes: props.likes.length,
    dislikes: props.dislikes.length,
  });

  useEffect(() => {
    socket.emit("join", { roomname: "singlepost" });
    return () => {
      socket.off();
    };
  }, []);

  socket.on("updatedlikes", ({ dislikes,likes,postid }) => {
    if(postid===props.postid){
        setState({likes: likes,dislikes:dislikes});
    }else{
        console.log("post dont't match")
    }  
    // io.to("publicresponse").emit("updatedlikes",{likes});
});

socket.on("updatedDislikes", ({ likes,dislikes,postid }) => {
    if(postid === props.postid){
        setState({ likes:likes,dislikes: dislikes });
    }
    else{
        console.log("post dont't match")
    }
    // io.to("publicresponse").emit("updatedDislikes",{dislikes});
  });

  return (
    <Card
      unique={props.unique}
      userid={props.userid}
      postid={props.postid}
      index={props.index}
    //   likes={props.likes.length}
    //   dislikes={props.dislikes.length}
    likes={state.likes}
    dislikes={state.dislikes}
      postCreatorName={props.postCreator}
      postCreatorImg={props.postCreatorImg}
      imgSrc={props.imgSrc}
      description={props.description}
    />
  );
};

export default Post;
