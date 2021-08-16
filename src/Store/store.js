import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAPI } from "./services/user.service";
import { taskAPI } from "./services/task.service";
import userReducer from "./userSlice";
export const store = configureStore({
	reducer: {
		[userAPI.reducerPath]: userAPI.reducer,
		[taskAPI.reducerPath]: taskAPI.reducer,
		user: userReducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware).concat(taskAPI.middleware),
});

setupListeners(store.dispatch);
