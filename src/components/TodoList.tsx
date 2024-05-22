import React from 'react';
import TodoItem from './TodoItems';
import { Todo, State, Action } from './Type';
type Props = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
  setTodoToEdit: (todo: Todo | null) => void;
  setTodoToDelete: (todo: Todo | null) => void;
};

const TodoList: React.FC<Props> = ({ todos, dispatch, setTodoToEdit, setTodoToDelete }) => {
  return (
    <ul className="list-group mb-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          dispatch={dispatch}
          setTodoToEdit={setTodoToEdit}
          setTodoToDelete={setTodoToDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
