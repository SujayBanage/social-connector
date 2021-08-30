import express from "express"
import multer from "multer"
import {
  postUpload,
  getAllPosts,
  profileupload,
  getUserData,
  getAllUsers,
  getpost,
  getUser,
  createChat,
  getPrivateChats,
  getMessages,
  getGroupChats,
  getUserById
} from "../controllers/privateControllers.js";
import {checkUser} from "../middlewares/checkUser.js";
const privaterouter = new express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("failed in fileFilter!!!!!!");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

privaterouter.post("/postUpload", checkUser, upload.single("image"), postUpload);
privaterouter.get("/getPosts", checkUser, getAllPosts);
privaterouter.post(
  "/profileupload",
  checkUser,
  upload.single("image"),
  profileupload
);
privaterouter.get("/getuserdata", checkUser, getUserData);
privaterouter.get("/getuserdata/:postCreatorName", getUserData);
privaterouter.get("/getallusers", checkUser, getAllUsers);
privaterouter.get("/getpost/:postid", getpost);
privaterouter.post("/getuser", checkUser, getUser);
privaterouter.post("/createChat", createChat);
privaterouter.get("/getchats", checkUser, getPrivateChats);
privaterouter.get("/getmessages/:chatroom", checkUser, getMessages);
privaterouter.get("/getGroupChats", checkUser, getGroupChats);
privaterouter.get('/getuser/:id',getUserById);

export {privaterouter};
