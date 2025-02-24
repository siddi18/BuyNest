import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
        query: data => ({
          url: `${USERS_URL}/register`,
          method: "POST",
          body: data,
        }),
      }),
      forgotPassword: builder.mutation({
        query: data => ({
          url: `${USERS_URL}/forgot-password`,
          method: "POST",
          body: data,
        }),
      }),
      resetPassword: builder.mutation({
        query: data => ({
          url: `${USERS_URL}/reset-password/${data.resetToken}`,
          method: "PATCH",
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logoutUser`,
          method: "GET",
        }),
      }),
      updateUserProfile: builder.mutation({
        query: data => ({
          url: `${USERS_URL}/update`,
          method: "PUT",
          body: data,
        }),
      }),
      getUsers: builder.query({
        query: () => ({
          url: USERS_URL,
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        query: user => ({
          url: `${USERS_URL}/${user.id}`,
          method: "PUT",
          body: user,
        }),
      }),
      getUserById: builder.query({
        query: id => ({
          url: `${USERS_URL}/${id}`,
        }),
        keepUnusedDataFor: 5,
      }),
      deleteUser: builder.mutation({
        query: id => ({
          url: `${USERS_URL}/${id}`,
          method: 'DELETE'
        }),
        keepUnusedDataFor: 5,
      }),
      })
})


export const {useLoginMutation,
   useLogoutMutation, 
   useForgotPasswordMutation, 
   useResetPasswordMutation, 
   useRegisterMutation, 
   useUpdateUserProfileMutation, 
   useUpdateUserMutation,
   useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation} = userApiSlice