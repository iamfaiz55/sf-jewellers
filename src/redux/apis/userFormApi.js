import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userFormApi = createApi({
    reducerPath: "userFormApi",
    baseQuery: fetchBaseQuery({   baseUrl:`${import.meta.env.VITE_BACKEND_URL}/api/user`, 
        prepareHeaders: (headers, { getState }) => {
            // Get the token from Redux store or localStorage
            const token = getState().userData.token; // Or from Redux: getState().auth.token
// console.log("token from header", token);

            // If there's a token, set the Authorization header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

        

            return headers;
        },

     }),
    tagTypes: ["userData"],
    endpoints: (builder) => {
        return {
            // getUsers: builder.query({
            //     query: () => {
            //         return {
            //             url: "/apiEndPoint",
            //             method: "GET"
            //         }
            //     },
            //     providesTags: ["userData"]
            // }),
            updateProfile: builder.mutation({
                query: data => {
                  
                    return {
                        url: `/update-profile`,
                        method: "PUT",
                        body: data,
                       
                       
                    }
                },
                transformResponse:data => {
                    const userProfile = JSON.parse(localStorage.getItem("user"));
        
                    if (userProfile._id == data.result._id) {
                        // userProfile.image = data.result.image;
                        localStorage.setItem("user", JSON.stringify(data.result));
                    }   
                },
                invalidatesTags: ["user"]
            }),
        
        }
    }
})

export const { 
    useUpdateProfileMutation
} = userFormApi
