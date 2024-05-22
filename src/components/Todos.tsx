import React, { useReducer, useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './Todoform';
import ConfirmModal from './ConfirmModal';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type State = {
  todos: Todo[];
  todoToEdit: Todo | null;
  todoToDelete: Todo | null;
};

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'SET_TODO_TO_EDIT'; payload: Todo | null }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'SET_TODO_TO_DELETE'; payload: Todo | null };

const initialState: State = {
  todos: [],
  todoToEdit: null,
  todoToDelete: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_TODO_TO_EDIT':
      return { ...state, todoToEdit: action.payload };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'SET_TODO_TO_DELETE':
      return { ...state, todoToDelete: action.payload };
    default:
      return state;
  }
};

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    savedTodos.forEach((todo: Todo) => dispatch({ type: 'ADD_TODO', payload: todo }));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <div className="container">
      <h1 className="my-4">Todo List</h1>
      <TodoForm
        todoToEdit={state.todoToEdit}
        dispatch={dispatch}
      />
      <TodoList
        todos={state.todos}
        dispatch={dispatch}
        setTodoToEdit={(todo) => dispatch({ type: 'SET_TODO_TO_EDIT', payload: todo })}
        setTodoToDelete={(todo) => dispatch({ type: 'SET_TODO_TO_DELETE', payload: todo })}
      />
      <ConfirmModal
        todoToDelete={state.todoToDelete}
        dispatch={dispatch}
      />
    </div>
  );
};

export default TodoApp;
