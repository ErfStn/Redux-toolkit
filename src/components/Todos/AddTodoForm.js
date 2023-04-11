import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAsyncTodos } from "../../features/todos/TodosSlicer";

const AddTodoForm = () => {
	const [value, setValue] = useState("");
	const dispatch = useDispatch();

	const onSubmit = event => {
		event.preventDefault();
		if (value) {
			dispatch(addAsyncTodos({ title: value }));
		}
		setValue("");
	};

	return (
		<form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
			<h3 className="sr-only text-primary">Todo list</h3>
			<input
				type="text"
				className="form-control mb-2 mr-sm-2"
				placeholder="Add todo..."
				value={value}
				onChange={event => setValue(event.target.value)}
			></input>

			<button type="submit" className="btn btn-primary mb-2">
				Submit
			</button>
		</form>
	);
};

export default AddTodoForm;
