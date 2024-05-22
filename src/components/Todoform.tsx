import React, { useState, useEffect } from 'react';
import { Todo, State, Action } from './Type';
type Props = {
  todoToEdit: Todo | null;
  dispatch: React.Dispatch<Action>;
};

const TodoForm: React.FC<Props> = ({ todoToEdit, dispatch }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (todoToEdit) {
      setText(todoToEdit.text);
    }
  }, [todoToEdit]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() === '') return;

    if (todoToEdit) {
      dispatch({
        type: 'UPDATE_TODO',
        payload: { ...todoToEdit, text },
      });
      dispatch({ type: 'SET_TODO_TO_EDIT', payload: null });
    } else {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: Date.now(), text, completed: false },
      });
    }

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          value={text}
          style={{width:""}}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />  
        <button type="submit" className="btn btn-primary">
        {todoToEdit ? 'Update' : 'Add'}
      </button>
      </div>
   
    </form>
  );
};

export default TodoForm;
