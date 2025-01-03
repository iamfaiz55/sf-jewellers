import { createSlice } from "@reduxjs/toolkit";
import { adminAuthApi } from "../apis/adminAuthApi";

const adminSlice= createSlice({
    name: "adminSlice",
    initialState: {
        admin : JSON.parse(localStorage.getItem("admin")),
        // email: json
    },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(adminAuthApi.endpoints.verifyOTP.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(adminAuthApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.email = payload
        })
        .addMatcher(adminAuthApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        // .addCase(actionName.rejected, (state, { payload }) => {
        //     state.loading = false
        //     state.error = payload
        // })
       
})

export const { invalidate } = adminSlice.actions
export default adminSlice.reducer