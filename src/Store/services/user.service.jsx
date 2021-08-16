// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { initializeUser, resetUser, updateUser } from "../userSlice";

export const userAPI = createApi({
	reducerPath: "userAPI",
	baseQuery: fetchBaseQuery({ baseUrl: "https://my-simple-task-manager.herokuapp.com/api/users" }),
	tagTypes: ["IUser"],
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (body) => ({
				url: "",
				method: "POST",
				body,
			}),
			async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
				console.log("Starting Query On Creating User");
				try {
					const result = await queryFulfilled;
					dispatch(initializeUser(result.data));
				} catch (e) {}
			},
		}),
		// Endpoint Name function : [builder.mutation/builder.query] <ResponseInterface, RequestInterface>
		loginUser: builder.mutation({
			query: (signIn) => ({
				url: "/login",
				method: "POST",
				body: signIn,
			}),

			async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
				console.log("Starting Query on Login User");
				try {
					const result = await queryFulfilled;
					dispatch(initializeUser(result.data));
				} catch (e) {}
			},
		}),
		logoutUser: builder.mutation({
			query: (token) => ({
				url: "/logout",
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),

			async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
				try {
					const result = await queryFulfilled;
					console.log(result);
					dispatch(resetUser());
				} catch (e) {
					dispatch(resetUser());
				}
			},
		}),
		updateUser: builder.mutation({
			query: ({ updateDetails, token }) => ({
				url: "/me",
				method: "PATCH",
				body: updateDetails,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),

			async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
				try {
					console.log("Updating user in the API Store");
					console.log(arg);
					const result = await queryFulfilled;
					console.log("result", result);
					dispatch(updateUser(result.data));
				} catch (e) {}
			},
		}),
	}),
});
export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation, useUpdateUserMutation } = userAPI;
