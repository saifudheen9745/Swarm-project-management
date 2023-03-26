import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userId:"",
    name:'',
    email:''
}

export const userSlice = createSlice({
    name:"userDetails",
    initialState,
    reducers:{
        setDetails:(state,action)=>{
            state.userId = action.payload.userId
            state.name = action.payload.name
            state.email = action.payload.email
        }
    }
})

export const {setDetails} = userSlice.actions
export default userSlice.reducer

export const userReducer = (state) => state.userReducer