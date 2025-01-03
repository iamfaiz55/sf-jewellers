import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const openApi = createApi({
    reducerPath: "openApi",
    baseQuery: fetchBaseQuery({
        //  baseUrl: "http://localhost:5000/api/open"
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/open`, credentials:"include" 
         }),
    tagTypes: ["open", "admin"],
    endpoints: (builder) => {
        return {
            getAllCAtegories: builder.query({
                query: () => ({
                    url: `/categories`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),

            getFilteredData: builder.query({
                query: (type) => ({
                    url: `/filter`,
                    method: "GET",
                    params: type
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),

            getCArousel: builder.query({
                query: () => ({
                    url: `/carousel`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),

            getAllProducts: builder.query({
                query: ({ page = 1, limit = 12, type } = {}) => ({
                    url: "/get-products",
                    method: "GET",
                    params: { page, limit, type }  
                }),
                // transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),

            getDetails: builder.query({
                query: (id) => ({
                    url: `/details/${id}`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getCompanyDetails: builder.query({
                query: () => ({
                    url: `/get-company`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),

            getTaxes: builder.query({
                query: () => ({
                    url: `/get-tax`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
//             get-scroll-cards
// get-menu-items
            getAllMenuItems: builder.query({
                query: () => ({
                    url: `/get-menu-items`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getAllScrollCards: builder.query({
                query: () => ({
                    url: `/get-scroll-cards`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            getAllAddImages: builder.query({
                query: () => ({
                    url: `/get-adds-images`,
                    method: "GET"
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            // getVarient: builder.query({
            //     query: (id) => ({
            //         url: `/get-varient/${id}`,
            //         method: "GET"
            //     }),
            //     transformResponse: (data) => data.result,
            //     providesTags: ["user"]
            // }),

            postContact: builder.mutation({
                query: (contactData) => ({
                    url: `post-contact`,
                    method: "POST",
                    body: contactData
                }),
                transformResponse: (data) => data.result,
                providesTags: ["user"]
            }),
            postHistory: builder.mutation({
                query:historyData => {
                    return {
                        url: `/post-history`,
                        method: "POST",
                        body: historyData
                    }
                },
                transformResponse:data => data.result,
                invalidatesTags: ["user"]
            }),
            getPublicProductMaterial: builder.query({
                query: () => {
                    return {
                        url: `/get-product-material`,
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["material"]
            }),
           
        }
    }
})

export const {
    useGetAllCAtegoriesQuery,
    useLazyGetFilteredDataQuery,
    useGetAllProductsQuery,
    useLazyGetAllProductsQuery,  
    useGetCArouselQuery,
    useGetDetailsQuery,
    usePostContactMutation,
    useGetTaxesQuery,
    useLazyGetTaxesQuery,
    useGetCompanyDetailsQuery,
    useGetAllScrollCardsQuery,
    useGetAllMenuItemsQuery,
    useGetAllAddImagesQuery,
    usePostHistoryMutation,
    useGetPublicProductMaterialQuery
    // useGetVarientQuery
} = openApi;


// useAddAddressMutation,
// useGetAddressesQuery,
// useGetDetailsQuery,
// useGetOrdersQuery,
// useAddCartMutation,
// useGetAllCartItemsQuery,
// useDeleteCArtItemMutation,
// useCreateOrderMutation,
// useDeleteFullCartMutation,
// // useGetAllProductsQuery,
// useCancelOrderMutation,
// // useGetCArouselQuery,
// // useGetFilteredDataQuery,
// // useLazyGetFilteredDataQuery,
// useUpdateProfileMutation,
// useLikeMutation,
// useDeleteLikeMutation,
// useGetLikedQuery,
// // useGetAllCAtegoriesQuery

