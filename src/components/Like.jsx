import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector,useDispatch } from "react-redux";
import { postStatus } from "../store/PostSlice";

function Like({ postId, userId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  const dispatch = useDispatch()
  const likeStatus = useSelector((state) => state.post.liked)

  useEffect(()=> {
   
    console.log(likeStatus,liked)
    dispatch(postStatus(liked))
  },[liked])

     

  

  const handleLike = async () => {
    if(liked){
      setLikeCount((prev) => prev-1)
      setLiked(!liked)
    }
    else{
        setLikeCount((prev) => prev+1)
        setLiked(!liked)
    }
  };


  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={faHeart}
        style={{
          color: liked ? "#FF69B4" : "#edf1f7",
          cursor: "pointer"
        }}
        onClick={handleLike}
      />
      <span className="ml-2 text-sm">{likeCount} likes</span>
    </div>
  );
}

export default Like;