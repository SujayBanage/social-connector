import React, { useEffect, useState, useContext,lazy,Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { socketContext } from "../../index.js";
import "./comments.css";
import apiRequestService from "../../services/apiRequestService.js";
import LazyLoad from "../../UIshared/lazyload/lazyload.js";
const Comment = lazy(()=>import("./comment/comment.js")) ;
const apiRequest = new apiRequestService();
const Comments = () => {
  const socket = useContext(socketContext);
  const { postid, userid } = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({
    creatorName: "",
    creatorImg: "",
    postImg: "",
    description: "",
    likes: [],
    dislikes: [],
  });
  useEffect(() => {
    async function fetchData() {
      const res = await apiRequest.fetchData(`${process.env.REACT_APP_PRIVATE_URL}/getpost/${postid}`);
      console.log(res);
      setPost({
        creatorName: res.data.post.creatorName,
        creatorImg: res.data.post.creatorImg,
        postImg: res.data.post.imgsrc,
        description: res.data.post.description,
        likes: [...res.data.post.likes],
        dislikes: [...res.data.post.dislikes],
      });
      setComments([...res.data.comments]);
      console.log(comments);
      console.log(post);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.emit("join", { roomname: "commentsroom" });
    return () => {
      socket.off();
    };
  }, []);

  socket.on("updatedComments", ({ Comments ,user}) => {
    if(user === post.creatorName){
      setComments([...Comments]);
      console.log(Comments);
    }
  });

  socket.on("reply", ({ Comments }) => {
    setComments([...Comments]);
  });

  socket.on("commentLikeUpdate", ({ Comments }) => {
    console.log(Comments);
    setComments([...Comments]);
  });

  socket.on("commentDislikeUpdate", ({ Comments }) => {
    console.log(Comments);
    setComments([...Comments]);
  });

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const addCommentHandler = () => {
    socket.emit("commentsUpdate", { postid, userid, text: comment });
    setComment("");
  };

  return (
    <>
      <div className="commentsComponent h-full w-screen flex flex-col items-center  justify-between">
        <div className="post flex flex-col lg:flex-row lg:items-center items-center lg:p-2 justify-center lg:h-2/5 w-4/5 lg:w-1/2   mt-4 rounded-lg">
          <div className="postimg flex flex-col flex-wrap items-center lg:w-4/5 h-full m-2 ">
            <LazyLoad
              imgsrc={`${process.env.REACT_APP_OUTPUT_URL}/${post.postImg}`}
              styleClass="object-cover rounded-lg"
              alt="image"
            />
          </div>
          <div className="postinfo flex flex-col items-center ">
            <div className="postcreator flex items-center justify-start  m-2">
              <LazyLoad
                imgsrc={`${process.env.REACT_APP_OUTPUT_URL}/${post.creatorImg.replace(
                  /\\/g,
                  "/"
                )}`}
                styleClass="h-10 w-10 md:h-12 md:w-12 rounded-full mr-2"
                alt="image"
              />
              <Link to={`/profile/${post.creatorName}`}>
                <span className="font-bold">{post.creatorName}</span>
              </Link>
            </div>
            <div className="postdescription m-2">
              <span> description: {post.description}</span>
            </div>
            <div className="postresponse flex items-center justify-between m-2">
              <span className="m-1">likes: {post.likes.length}</span>
              <span className="m-1">dislikes: {post.dislikes.length}</span>
            </div>
          </div>
        </div>

        <div className="addCommentDiv p-4 w-3/5">
          <div className="mb-4">
            <label
              className="block text-white text-center md:text-xl font-bold mb-2"
              htmlFor="descreption"
            >
              add comment...
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              name="comment"
              type="text"
              placeholder="add comment...."
              value={comment}
              onChange={commentHandler}
            />
            <button
              onClick={addCommentHandler}
              className="addComment md:h-12 md:w-26 bg-green-500 text-center text-white font-bold md:text-xl p-2 rounded-md"
            >
              add comment
            </button>
          </div>
        </div>
        <div className="commentsContainer h-1/2 w-full lg:w-3/5 overflow-y-scroll p-4">
          {comments.length !== 0
            ? comments.map((cmt) => {
                return (
                  <Suspense fallback={<h1>loading...</h1>}>
                  <Comment
                    key={cmt._id}
                    commentid={cmt._id}
                    text={cmt.text}
                    postid={cmt.postid}
                    commentBy={cmt.commentBy}
                    likes={cmt.likes}
                    dislikes={cmt.dislikes}
                    children={cmt.children}
                    userid={userid}
                  />
                  </Suspense>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Comments;
