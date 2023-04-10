import React from "react";

const TodoItem = ({ id, title, completed }) => {
	return (
		<li
			key={id}
			className={`list-group-item ${completed && "list-group-item-success"}`}
		>
			<div className="d-flex justify-content-between">
				<span className="d-flex align-items-center">
					<input type="checkbox" className="mx-3" checked={completed}></input>
					{title}
				</span>
				<button className="btn btn-danger">Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
