import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    allPosts : []
}

const postSlice = createSlice({
    name : "posts",
    initialState,
    reducers:{
        setPosts : (state,action)=>{
            state.allPosts = action.payload;
        }
    }
});

export const {setPosts} = postSlice.actions;

export default postSlice.reducer;