/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import AddPostPopup from "./AddPostPopup";
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";
export default function AddPost({groupid}) {
  console.log(groupid);
    const dispatch = useDispatch();
  const [openPopup, setopenPopup] = useState(false);
    useEffect(() => {
      dispatch(fetchconnectuser());
        }, [dispatch]);
      const connecteduser=useSelector(selectSessionUser)[0];
  return (
    <>
      <div class="bg-white shadow border border-gray-100 rounded-lg dark:bg-gray-900 lg:mx-0 p-4">
        <div class="flex space-x-3">
          <img src={connecteduser.profilePicture} class="w-10 h-10 rounded-full" />
          <input
            onClick={() => setopenPopup(true)}
            placeholder="What's Your Mind ?"
            class="bg-gray-100 hover:bg-gray-200 flex-1 h-10 px-6 rounded-full"
          />
        </div>
        <AddPostPopup openPopup={openPopup} setopenPopup={setopenPopup} groupid={groupid}></AddPostPopup>
        <div class="grid grid-flow-col pt-3 -mx-1 -mb-1 font-semibold text-sm">
          <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer">
            <img src="assets/user/images/post/photo.png"></img>
            &ensp; Photo/Video
          </div>
          <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer">
            <img src="assets/user/images/post/add-user.png"></img>
            &ensp; Tag Friend
          </div>
          <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer">
            <img src="assets/user/images/post/smile.png"></img>
            &ensp; <button>Fealing /Activity</button>
          </div>
        </div>
      </div>
    </>
  );
}
