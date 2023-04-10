import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../features/counter/CounterSlice";
import { useState } from "react";

const Counter = () => {
	const [inputValue, setinputValue] = useState("");

	const count = useSelector(state => state.counter);
	const dispatch = useDispatch();
	return (
		<div>
			<h1>Counter state</h1>
			<h2>Counter: {count.value}</h2>
			<input
				type="text"
				value={inputValue}
				onChange={e => setinputValue(e.target.value)}
			/>
			<button onClick={() => dispatch(increment(Number(inputValue)))}>+</button>
			<button onClick={() => dispatch(decrement(Number(inputValue)))}>-</button>
		</div>
	);
};

export default Counter;
