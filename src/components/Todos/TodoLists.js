import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncTodos } from "../../features/todos/TodosSlicer";

const TodoList = () => {
	const { todos, loading, error } = useSelector(state => state.todos);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAsyncTodos());
	}, []);

	if (loading) {
		return <h4>Loading...</h4>;
	}
	if (error) {
		return <h4 className="text-danger">{error}</h4>;
	}
	return (
		<ul className="list-group">
			{todos.map(todo => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
