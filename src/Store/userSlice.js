import { createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "./services/task.service";

const user = {
	user: {
		age: 999,
		_id: Math.floor(Math.random() * 100).toString(),
		name: "Guest",
		email: "guest@guest.com",
	},
	token: "",
	options: {
		completed: "",
		limit: 10,
		page: "",
		sortBy: "createdAt:desc",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState: user,
	reducers: {
		initializeUser: (state, action) => {
			console.log("Initializing User");
			console.log(action.payload);
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},
		resetUser: (state) => {
			console.log("Resetting User");
			state.user = user.user;
			state.token = user.token;
		},
		updateUser: (state, action) => {
			console.log("updating User");
			console.log(action.payload);
			state.user = action.payload;
			console.log(state.user);
		},
		updateOptions: (state, action) => {
			console.log(action.payload);
			const { completed, limit, page, sortBy } = action.payload;
			Object.assign(state.options, { completed, limit, page, sortBy });
			console.log(state.options.completed);
			console.log(state.options.limit);
			console.log(state.options.page);
			console.log(state.options.sortBy);
			console.log(state.token);
			const token = state.token;
			const options = { completed, limit, page, sortBy };
		},
	},
});

export const { initializeUser, resetUser, updateUser, updateOptions } = userSlice.actions;

export default userSlice.reducer;
