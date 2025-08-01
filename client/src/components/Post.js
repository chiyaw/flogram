import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { HeartFilled, CommentOutlined } from "@ant-design/icons";
import { getAllPosts, likeOrUnlikePost } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";

function Post({ post }) {
  const dispatch = useDispatch()
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id
  );
const {likeOrUnlikeLoading} = useSelector(state => state.alertsReducer)

useEffect(() => {

dispatch(getAllPosts())

},[likeOrUnlikeLoading])



  return (
    <div className="bs1 p-2">
      <div className="d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          {post.user.profilePicUrl == null ? (
            <span className="profilepic1 d-flex align-items-center justify-content-center">
              {post.user.username[0]}
            </span>
          ) : (
            <img src={post.user.profilePicUrl} />
          )}

          <Link className="ml-2 namecss">{post.user.username}</Link>
        </div>

        <div className="">
          <p> {moment(post.createdAt).format('MMM D, YYYY')}</p>
        </div>
      </div>

      <img src={post.image} alt={post.title} className="postimage" />

      <p className="text-left mt-1 mb-1">{post.description}</p>

      <div className="d-flex align-items-center mt-2">
        <div className="d-flex align-items-center me-3">
        <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => {
              dispatch(likeOrUnlikePost({ postid: post._id }));
            }}
          />
          <p className="mb-0 ms-2">{post.likes.length}</p>
        </div>
        <div className="d-flex align-items-center">
          <CommentOutlined style={{ fontSize: '20px' }} />
          <p className="mb-0 ms-2">{post.comments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
