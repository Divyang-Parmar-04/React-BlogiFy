import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false,
    status : false,
    userData : [],
    newBlog:0
} 
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
         
        login:(state)=>{
            state.isLogin = true
        },
        logout:(state)=>{
            state.isLogin = false
        },
        setData:(state,action)=>{
            state.status = true,
            state.userData = action.payload
        },
        deleteBlog:(state,action)=>{
            state.status = false,
            state.userData = state.userData.filter((blog)=>blog._id !=action.payload.id)
        },
        addNewBlog:(state,action)=>{
           state.userData.push(action.payload)
        },
        updateBlog: (state, action) => {
            const updatedBlog = action.payload;
            state.userData = state.userData.map(blog =>
              blog._id === updatedBlog._id ? updatedBlog : blog
            )
        }

    }
})
export const {login,logout,addNewBlog,setData,deleteBlog,updateBlog} = authSlice.actions

export default authSlice.reducer