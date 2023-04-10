import "./App.css";
import TodoList from "./components/Todos/TodoLists";
import TotalCompleteItems from "./components/Todos/TotalCompeletTodo";
import AddTodoForm from "./components/Todos/AddTodoForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className="App container">
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
}

export default App;
