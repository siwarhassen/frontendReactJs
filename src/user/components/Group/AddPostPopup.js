/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@material-ui/core";
import { queryApi } from "../../../utils/queryApi";
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";
import {
  createPost,
  createPostGroup,
  getPosts,
  resetSaved,
} from "../../../redux/actions/postAction";

import Picker from "emoji-picker-react";
import axios from "axios";

import { Formik } from "formik";

function AddPostPopup(props) {
  const desc = useRef();
  const titleTxt = "Create Post";
  const btnTxt = "Share";
  const { openPopup, setopenPopup, groupid, post = {} } = props;
  const dispatch = useDispatch();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmoji, setshowEmoji] = useState(false);
  const [message, setmessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    //const ref = desc.current;
    //ref.focus();
    setChosenEmoji(emojiObject);
    /*const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    setmessage(start + chosenEmoji.emoji + end);*/
  };
  console.log("groupe" + groupid);

  useEffect(() => {
    dispatch(fetchconnectuser());
  }, [dispatch]);
  const connecteduser = useSelector(selectSessionUser)[0];
  post.username = connecteduser._id;
  post.Group = groupid;
  function handleFormSubmit(values, bag) {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    //axios.post("http://localhost:3000/pi/postRoute/postgroup", values);
    //this.bag = bag;
    dispatch(createPostGroup(values));

    setopenPopup(false);
  }

  const saved = useSelector((state) => state.postReducer.saved);
  useEffect(() => {
    if (saved) {
      dispatch(getPosts());
      dispatch(resetSaved());
    }
  }, [dispatch, saved]);

  return (
    <Dialog open={openPopup}>
      <Formik
        initialValues={{
          description: "",
          username: connecteduser._id,
          Group: groupid,
        }}
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, handleChange, setFieldValue, values }) => {
          return (
            <>
              <div
                class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical rounded-lg p-0 lg:w-5/12 relative shadow-2xl uk-animation-slide-bottom-small"
                style={{ width: "1024px" }}
              >
                <div class="text-center py-4 border-b">
                  <h3 class="text-lg font-semibold"> {titleTxt} </h3>
                  <button
                    class="uk-modal-close-default bg-gray-100 rounded-full p-2.5 m-1 right-2"
                    type="button"
                    uk-close
                    uk-tooltip="title: Close ; pos: bottom ;offset:7"
                    onClick={() => setopenPopup(false)}
                  >
                    <img src="assets/user/images/post/close.png"></img>
                  </button>
                </div>
                <div class="flex flex-1 items-start space-x-4 p-5">
                  <img
                    src={connecteduser.profilePicture}
                    class="bg-gray-200 border border-white rounded-full w-11 h-11"
                  />
                  <div class="flex-1 pt-2">
                    <input
                      type="textarea"
                      class="uk-textare text-black shadow-none focus:shadow-none text-xl font-medium resize-none"
                      rows="5"
                      placeholder="What's Your Mind ?"
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                    ></input>
                    {/* {showEmoji && (
                      <div>
                        {chosenEmoji ? (
                          <span>You chose: {chosenEmoji.emoji}</span>
                        ) : (
                          <span>No emoji Chosen</span>
                        )}
                        <Picker onEmojiClick={onEmojiClick} />
                      </div>
                        )}*/}
                  </div>
                </div>
                <div class="bsolute bottom-0 p-4 space-x-4 w-full">
                  <div class="flex bg-gray-50 border border-purple-100 rounded-2xl p-3 shadow-sm items-center">
                    <div class="lg:block hidden"> Add to your post </div>
                    <div class="flex flex-1 items-center lg:justify-end justify-center space-x-2"></div>
                  </div>
                </div>
                <div class="flex items-center w-full justify-between p-3 border-t">
                  <div class="flex space-x-2">
                    <a
                      onClick={handleSubmit}
                      class="bg-blue-600 flex h-9 items-center justify-center rounded-md text-white px-5 font-medium"
                    >
                      {btnTxt}
                    </a>
                  </div>

                  <a
                    href="#"
                    hidden
                    class="bg-blue-600 flex h-9 items-center justify-center rounded-lg text-white px-12 font-semibold"
                  >
                    Share
                  </a>
                </div>
              </div>
            </>
          );
        }}
      ></Formik>
    </Dialog>
  );
}

export default AddPostPopup;
