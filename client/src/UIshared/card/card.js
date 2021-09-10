import React, { useState, useContext, useEffect } from "react";
import "./card.css";
import { Link, useHistory } from "react-router-dom";
import like from "../../images/like.png";
import likeActive from "../../images/likeActive.png";
import dislike from "../../images/dislike.png";
import dislikeActive from "../../images/dislikeActive.png";
import comments from "../../images/comments.png";
import commentsActive from "../../images/commentsActive.png";
import Lazyload from "../lazyload/lazyload.js";
import { socketContext } from "../../index.js";

const Card = (props) => {
  const history = useHistory();
  console.log(props.userid);
  const socket = useContext(socketContext);
  const [state, setState] = useState({
    likestate: false,
    dislikestate: false,
    commentstate: false,
  });

  // const [pic, setPic] = useState("");

  // useEffect(() => {
  //   const image = new Image("");
  //   image.src = `http://localhost:8000/output/${props.imgSrc}`;
  //   setPic(image);
  // }, []);

  const responseHandler = (e) => {
    if (e.target.name === "likes" && props.postid === props.unique) {
      console.log(props.userid);
      // setResponse({...response,Likes:++response.Likes});
      // const res =  await apiRequest.sendformData({postid:props.postid,likes:response.likes},'/publicResponse')

      socket.emit("likesUpdate", {
        postid: props.postid,
        Userid: props.userid,
      });
      // console.log(res);
    } else if (e.target.name === "dislikes" && props.postid === props.unique) {
      console.log(props.userid);
      // setResponse({...response,Dislikes:++response.Dislikes});
      socket.emit("dislikesUpdate", {
        postid: props.postid,
        Userid: props.userid,
      });
      // const res =  await apiRequest.sendformData({postid:props.postid,dislikes:response.dislikes},'/publicResponse')
      // console.log(res);
    }
  };

  return (
    <>
      {props.postCreatorName ? (
        <>
          <div className="cardContainer flex flex-col items-start m-2 md:m-10 p-2 rounded-lg">
            <div className="postCreator flex items-center justify-start p-2 mb-2 w-full rounded-lg">
              <Link
                to={`/profile/${props.postCreatorName}`}
                className="flex items-center justify-start text-white"
              >
                <Lazyload
                  imgsrc={`${process.env.OUTPUT_URL}/${props.postCreatorImg}`}
                  styleClass="h-12 w-12 rounded-full object-cover mr-4 border-2 border-white"
                />
                {/* <img src={} className= alt="image"/> */}
                <span className="text-lg font-bold">
                  {props.postCreatorName}
                </span>
              </Link>
            </div>

            {/* <div className="imageAndDiscription flex flex-col items-center justify-center mb-4"> */}
            <Lazyload
              imgsrc={`${process.env.OUTPUT_URL}/${props.imgSrc}`}
              // imgsrc={pic}
              styleClass="rounded-md object-cover h-auto w-full"
              alt="image"
              srcset={`${process.env.OUTPUT_URL}/min-${props.imgSrc} 640w, ${process.env.OUTPUT_URL}/${props.imgSrc} 1000w`}
              sizes="(max-width:500px) 640w,1000w"
            />
            <span className="break-words  mt-4">{props.description}</span>
            {/* </div> */}

            <div className="publicResponseDiv flex items-center justify-center">
              <img
                src={state.likestate ? likeActive : like}
                className="h-7 w-7 m-3"
                onMouseOver={() =>
                  setState({
                    ...state,
                    likestate: !state.likestate,
                  })
                }
                onMouseOut={() =>
                  setState({ ...state, likestate: !state.likestate })
                }
                // onClick={() =>setResponse({...response,likes:state.likes+1})}
                onClick={responseHandler}
                name="likes"
                alt="icon"
                height="5px"
                width="5px"
              />
              {/* {Likes} */}
              {props.likes}
              <img
                src={state.dislikestate ? dislikeActive : dislike}
                className="h-7 w-7 m-3"
                onMouseOver={() =>
                  setState({
                    ...state,
                    dislikestate: !state.dislikestate,
                  })
                }
                onMouseOut={() =>
                  setState({ ...state, dislikestate: !state.dislikestate })
                }
                // onClick={() =>setResponse({...response,dislikes:state.dislikes+1})}
                onClick={responseHandler}
                name="dislikes"
                alt="icon"
                height="5px"
                width="5px"
              />
              {/* {Dislikes} */}
              {props.dislikes}
              <img
                src={state.commentstate ? commentsActive : comments}
                className="h-7 w-7 m-3"
                onMouseOver={() =>
                  setState({
                    ...state,
                    commentstate: !state.commentstate,
                  })
                }
                onMouseOut={() =>
                  setState({ ...state, commentstate: !state.commentstate })
                }
                onClick={() =>
                  history.push(`/comments/${props.postid}/${props.userid}`)
                }
                alt="icon"
                height="5px"
                width="5px"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="cardWrapper flex items-center justify-center">
          <div className="cardContainer flex flex-col items-center justify-center">
            <div className="cardImgDiv flex items-center justify-center">
              <img src={props.imgSrc} />
            </div>
            <div className="cardDescriptionDiv flex items-center justify-center">
              <span className="break-words">{props.description}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
