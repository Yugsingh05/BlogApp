import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    liked : false,
    userData: null
}
const PostSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
        postStatus(state, action) {
            state.liked = state.liked;
            state.postId = action.payload.postId;
            state.userId = action.payload.userId;
        }
    }
})

export const {postStatus} = PostSlice.actions;
export default PostSlice.reducer;