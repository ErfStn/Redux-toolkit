import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/CounterSlice";
import todosReducer from "./todos/TodosSlicer";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		todos: todosReducer,
	},
});
