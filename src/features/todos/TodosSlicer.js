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
			return rejectWithValue(error);
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
// ! toggle todos
export const toggleAsyncTodos = createAsyncThunk(
	"todos/toggleAsyncTodos",
	async (payload, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`http://localhost:3001/todos/${payload.id}`,
				{
					id: payload.id,
					title: payload.title,
					completed: payload.completed,
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue([], error);
		}
	}
);
// ! delete todos
export const deleteAsyncTodos = createAsyncThunk(
	"todos/deleteAsyncTodos",
	async (payload, { rejectWithValue }) => {
		try {
			await axios.delete(`http://localhost:3001/todos/${payload.id}`);
			return { id: payload.id };
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
	// ? sync reducer
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
	// ? async reducer
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
				error: action.payload.message,
			};
		},
		// ! add todo reducer
		[addAsyncTodos.fulfilled]: (state, action) => {
			state.todos.push(action.payload);
		},
		// ! toggle todo reducer
		[toggleAsyncTodos.fulfilled]: (state, action) => {
			const selectedTodo = state.todos.find(t => t.id === action.payload.id);
			selectedTodo.completed = action.payload.completed;
		},
		// ! delete todo reducer
		[deleteAsyncTodos.fulfilled]: (state, action) => {
			state.todos = state.todos.filter(t => t.id !== action.payload.id);
		},
	},
});

export const { addTodo, toggleTodos, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
