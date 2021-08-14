// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskAPI = createApi({
	reducerPath: "taskAPI",
	baseQuery: fetchBaseQuery({ baseUrl: "https://my-simple-task-manager.herokuapp.com/api/tasks" }),
	tagTypes: ["ITask"],
	endpoints: (builder) => ({
		createTask: builder.mutation({
			query: ({ description, token }) => ({
				url: "",
				method: "POST",
				body: { description },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["ITask"],
			// invalidatesTags: [{ type: "IUser", id: "CREATE" }],
			// async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
			// 	console.log("Starting Query On Creating User");
			// 	try {
			// 		const result = await queryFulfilled;
			// 		dispatch(initializeUser(result.data));
			// 	} catch (e) {}
			// },
			// async onCacheEntryAdded(arg, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
		}),

		// GET /tasks/?completed=true
		// GET /tasks/?limit=3&page=4
		// GET /tasks/?sortBy=createdAt:desc
		getTasks: builder.query({
			query: ({ token, options }) => ({
				url: `?completed=${options.completed}&limit=${options.limit}&page=${options.page}&sortBy=${options.sortBy}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
				try {
					const result = await queryFulfilled;
					console.log("GETTING TASKS", result);
				} catch (e) {}
			},
			providesTags: ["ITask"],
		}),
		getTask: builder.query({
			query: ({ _id, token }) => ({
				url: `/${_id}`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["ITask"],
		}),
		updateTask: builder.mutation({
			query: ({ _id, description, token, completed }) => ({
				url: `/${_id}`,
				method: "PATCH",
				body: { description, completed },
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["ITask"],
		}),
		deleteTask: builder.mutation({
			query: ({ _id, token }) => ({
				url: `/${_id}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["ITask"],
		}),
	}),
});

export const { useCreateTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation } = taskAPI;
