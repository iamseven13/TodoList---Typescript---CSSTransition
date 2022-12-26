import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodoObject } from '../interfaces';

interface TodoListProps {
	todos: TodoObject[];
	setTodos: React.Dispatch<React.SetStateAction<TodoObject[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
	const [isActive, setIsActive] = useState(false);

	const handleRemove = (e: MouseEvent, todo: { text: string; id: string }) => {
		e.preventDefault();
		setIsActive((prev) => !prev);
		setTodos(todos.filter((todoItem) => todoItem.id !== todo.id));
	};

	const handleCompleted = (
		e: MouseEvent,
		todo: { text: string; id: string; isCompleted: boolean }
	) => {
		e.preventDefault();
		setTodos(
			todos.map((todoItem) => {
				if (todoItem.id === todo.id) {
					if (todoItem.isCompleted) {
						return {
							...todoItem,
							isCompleted: false,
						};
					}
					return {
						...todoItem,
						isCompleted: true,
					};
				} else {
					return todoItem;
				}
			})
		);
	};

	return (
		<div className="todolist-container">
			<TransitionGroup component={null}>
				{todos.map((todo) => (
					<CSSTransition
						key={todo.id}
						in={isActive}
						timeout={500}
						classNames="my-node"
						nodeRef={todo.nodeRef}
					>
						<div className="todo" ref={todo.nodeRef}>
							<p
								className={todo.isCompleted ? 'completed' : ''}
								onClick={(e) =>
									handleCompleted(e as unknown as MouseEvent, todo)
								}
							>
								{todo.text}
							</p>
							<button
								type="submit"
								onClick={(e) => handleRemove(e as unknown as MouseEvent, todo)}
							>
								-
							</button>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default TodoList;
