import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/TodosSlicer";

export const store = configureStore({
	reducer: {
		todos: todosReducer,
	},
});
