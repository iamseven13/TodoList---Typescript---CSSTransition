import React, { createRef, useState } from 'react';
import { TodoObject } from '../interfaces';

interface TodoProp {
	getTodo: (todo: TodoObject) => void;
}

const Todo: React.FC<TodoProp> = ({ getTodo }) => {
	const [todo, setTodo] = useState<{
		text: string;
		id: string;
		isCompleted: boolean;
		nodeRef?: any;
	}>({
		text: '',
		id: '',
		isCompleted: false,
		nodeRef: createRef(),
	});

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		getTodo(todo);
		setTodo({ text: '', id: '', isCompleted: false, nodeRef: createRef() });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setTodo({
			text: e.target.value,
			id: Math.random().toString(),
			isCompleted: false,
			nodeRef: createRef(),
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="What's planned?"
				onChange={handleChange}
				name="text"
				value={todo.text}
				autoFocus
			/>
			<button type="submit">+</button>
		</form>
	);
};

export default Todo;
