import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ! loading list of todos
export const getAsyncTodos = createAsyncThunk(
	"todos/getAsyncTodos",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:3001/todos");
			return response.data;
		} catch (error) {
			return rejectWithValue([], error);
		}
	}
);

// ! adding todos from input

export const addAsyncTodos = createAsyncThunk(
	"todos/addAsyncTodos",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.post("http://localhost:3001/todos/", {
				id: Date.now(),
				title: payload.title,
				completed: false,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue([], error);
		}
	}
);

const initialState = {
	todos: [],
	erorr: null,
	loading: false,
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: Date.now(),
				title: action.payload.title,
				completed: false,
			};
			state.push(newTodo);
		},
		toggleTodos: (state, action) => {
			const selectTodo = state.todos.find(t => t.id === action.payload.id);
			selectTodo.completed = !selectTodo.completed;
		},
		deleteTodo: (state, action) => {
			const filterTodo = state.todos.filter(t => t.id !== action.payload.id);
			state.todos = filterTodo;
		},
	},
	extraReducers: {
		[getAsyncTodos.fulfilled]: (state, action) => {
			return { ...state, todos: action.payload, loading: false };
		},
		[getAsyncTodos.pending]: (state, action) => {
			return { ...state, loading: true, todos: [] };
		},
		[getAsyncTodos.rejected]: (state, action) => {
			return {
				...state,
				loading: false,
				todos: [],
				error: action.error.message,
			};
		},
		// ! add todo action
		[addAsyncTodos.fulfilled]: (state, action) => {
			state.todos.push(action.payload);
		},
	},
});

export const { addTodo, toggleTodos, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
