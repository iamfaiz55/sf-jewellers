import { createSlice } from "@reduxjs/toolkit";
import { userAuthApi } from "../apis/userAuthApi";
// import { useSelector } from "react-redux";

// const  useSelector(state => state.userData)
const userSlice= createSlice({
    name: "userSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")),
        // mobile: JSON.parse(localStorage.getItem("mobile"))
    },
    reducers: {
        invalidate: (state, { payload }) => {
            payload.forEach(item => {
                state[item] = false
            })
        }
    },
    extraReducers: builder => builder
        .addMatcher(userAuthApi.endpoints.verifyOTPUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
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