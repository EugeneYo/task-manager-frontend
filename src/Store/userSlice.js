import { createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "./services/task.service";

// Define the initial state using that type
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
	// `createSlice` will infer the state type from the `initialState` argument
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

			// taskAPI.endpoints.getTasks.initiate({ token, options})
		},
		// decrement: (state) => {
		// 	state.value -= 1;
		// },
		// // Use the PayloadAction type to declare the contents of `action.payload`
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// },
	},
});

export const { initializeUser, resetUser, updateUser, updateOptions } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const authToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
