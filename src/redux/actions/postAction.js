import axios from "axios";
import { GET_POSTS, DELETE_POST, POST_SAVED, RESET_SAVED, POST_UPDATED,POSTGROUP_SAVED,POSTPAGE_SAVED  } from "./types";
const config = {
  headers: {
      "Content-Type":"appliation/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
  }
}
export const getPosts = () => {
  return async (dispatch) => {
    return await axios
      .get("https://aaweni.herokuapp.com/pi/postRoute/post")
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createPostGroup = (post) => {
  return async (dispatch) => {
    try {
      return await axios
        .post("https://aaweni.herokuapp.com/pi/postRoute/postgroup", post)
        .then((res) => dispatch({ type: POSTGROUP_SAVED, payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
};
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete("https://aaweni.herokuapp.com/pi/postRoute/post/" + postId,config);

      dispatch({ type: DELETE_POST, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    try {
      return await axios
        .post("https://aaweni.herokuapp.com/pi/postRoute/post", post)
        .then((res) => dispatch({ type: POST_SAVED, payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updatePost = (postId, post) => {
  return async (dispatch) => {
    try {
      const res = await axios.put("https://aaweni.herokuapp.com/pi/postRoute/post/" + postId, post);

      dispatch({ type: POST_UPDATED, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPostPage = (post) => {
  return async (dispatch) => {
    try {
      return await axios
        .post("https://aaweni.herokuapp.com/pi/postRoute/postpage", post)
        .then((res) => dispatch({ type: POSTPAGE_SAVED, payload: res.data }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const resetSaved = () => ({ type: RESET_SAVED });
