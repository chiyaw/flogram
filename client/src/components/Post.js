import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { HeartFilled, CommentOutlined } from "@ant-design/icons";
import { addComment, getAllPosts, likeOrUnlikePost } from "../redux/actions/postActions";
import { getAllUsers } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Row, Col, Input, Button } from "antd";

function Post({ post }) {
  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id
  );
  const { likeOrUnlikeLoading, addCommentLoading } = useSelector(state => state.alertsReducer);
  const { users = [] } = useSelector(state => state.usersReducer || {});
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const { TextArea } = Input;
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading, addCommentLoading]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
          <p> {moment(post.createdAt).format("MMM D, YYYY")}</p>
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
          <CommentOutlined
            style={{ fontSize: "20px" }}
            onClick={() => setCommentModalVisibility(true)}
          />
          <p className="mb-0 ms-2">{post.comments.length}</p>
        </div>
      </div>

      <Modal
        visible={commentModalVisibility}
        onCancel={() => setCommentModalVisibility(false)}
        title="Comments"
        closable={false}
        width={900}
        okText="Add Comment"
        onOk={() => {
          dispatch(addComment({ postid: post._id, comment: comment }));
          setCommentModalVisibility(false);
          setComment("");
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img
              src={post.image}
              height="400px"
              className="w-100"
              alt={post.title}
            />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea
              placeholder="Add your comment here"
              className="ml-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {post.comments.map((comment, index) => {
              const user = users.find((obj) => obj._id === comment.user);
              return (
                <div key={index} className="d-flex align-items-center">
                  {user.profilePicUrl == null ? (
                    <span className="profilepic2 d-flex align-items-center justify-content-center">
                      {user.username[0]}
                    </span>
                  ) : (
                    <img src={user.profilePicUrl} />
                  )}
                  <Link className="text-sm font-medium text-blue-600 hover:underline" style={{fontSize: "13px"}}>{user.username}</Link>
                  <p className="ml-2" style={{fontSize: "12px"}}>{comment.comment}</p>
                  <p className="mx-2 flex items-center" style={{fontSize: "10px"}}>
                    {moment(comment.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default Post;
