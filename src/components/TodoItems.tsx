import React from "react";
import { Todo, State, Action } from "./Type";
type Props = {
  todo: Todo;
  dispatch: React.Dispatch<Action>;
  setTodoToEdit: (todo: Todo | null) => void;
  setTodoToDelete: (todo: Todo | null) => void;
};

const TodoItem: React.FC<Props> = ({
  todo,
  dispatch,
  setTodoToEdit,
  setTodoToDelete,
}) => {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        todo.completed ? "completed" : ""
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
        />
        <span
          className={`ms-2 ${
            todo.completed ? "text-decoration-line-through" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm me-2"
          onClick={(e) => {
            e.stopPropagation();
            setTodoToEdit(todo);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            setTodoToDelete(todo);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
