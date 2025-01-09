import { createSlice } from "@reduxjs/toolkit";
import { userAuthApi } from "../apis/userAuthApi";
// import { userApi } from "../apis/userApi";
// import { useSelector } from "react-redux";

// const  useSelector(state => state.userData)
const userSlice= createSlice({
    name: "userSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")),
        token: JSON.parse(localStorage.getItem("token")),
        // mobile: JSON.parse(localStorage.getItem("mobile"))
    },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(userAuthApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            localStorage.setItem("token", JSON.stringify(payload.token))
            state.token = payload.token
        })
        .addMatcher(userAuthApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(userAuthApi.endpoints.logoutUser.matchFulfilled, (state) => {
            state.user = null
        })
      
        // .addCase(actionName.rejected, (state, { payload }) => {
        //     state.loading = false
        //     state.error = payload
        // })
       
})

// export const { invalidate } = userSlice.actions
export default userSlice.reducer