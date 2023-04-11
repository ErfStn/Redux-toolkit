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
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>{error}</p>;
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
