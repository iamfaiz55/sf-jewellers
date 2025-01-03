import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminAuthApi = createApi({
    reducerPath: "adminAuthApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/adminAuth`, credentials:"include" }),
    // baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/adminAuth`, credentials:"include" }),
    tagTypes: ["AdminAuth"],
    endpoints: (builder) => {
        return {
            registerAdmin: builder.mutation({
                query: (adminData) => {
                    return {
                        url: "/register-admin",
                        method: "POST",
                        body:adminData
                    }
                },
                invalidatesTags: ["AdminAuth"]
            }),
            loginAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse:data => {
                     localStorage.setItem("email", JSON.stringify(data.result))
                     return data.result
                },
                invalidatesTags: ["AdminAuth"]
            }),
        
            verifyOTP: builder.mutation({
                query: adminData => {
                    return {
                        url: "/verify-otp-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["AdminAuth"]
            }),
        
            logoutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse:() =>{
                    localStorage.removeItem("admin")
                    // return data
                },
                invalidatesTags: ["AdminAuth"]
            }),
        
        }
    }
})

export const { 
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useRegisterAdminMutation,
    useVerifyOTPMutation
} = adminAuthApi
