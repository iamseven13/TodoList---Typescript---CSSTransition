import React, { useState, useEffect } from 'react';
import { TodoObject } from './interfaces';
import './App.css';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

function App() {
	const [todos, setTodos] = useState<TodoObject[]>([]);

	useEffect(() => {
		const getLocalTodos = () => {
			if (localStorage.getItem('todos') === null) {
				localStorage.setItem('todos', JSON.stringify([]));
			} else {
				let toDoLocal = JSON.parse(localStorage.getItem('todos')!);
				console.log(toDoLocal);
				setTodos(toDoLocal);
			}
		};
		getLocalTodos();
	}, []);

	useEffect(() => {
		const saveLocalTodos = () => {
			localStorage.setItem('todos', JSON.stringify(todos));
		};
		saveLocalTodos();
	}, [todos]);

	const getTodo = (todo: TodoObject) => {
		setTodos([
			...todos,
			{
				text: todo.text,
				id: todo.id,
				isCompleted: todo.isCompleted,
			},
		]);
	};

	console.log(todos);

	return (
		<div className="container">
			<h1>Your Todo List</h1>
			<Todo getTodo={getTodo} />
			<TodoList todos={todos} setTodos={setTodos} />
		</div>
	);
}

export default App;
