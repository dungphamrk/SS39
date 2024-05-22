import React from 'react';
import { Todo, State, Action } from './Type';
type Props = {
  todoToDelete: Todo | null;
  dispatch: React.Dispatch<Action>;
};

const ConfirmModal: React.FC<Props> = ({ todoToDelete, dispatch }) => {
  if (!todoToDelete) return null;

  const handleConfirmDelete = () => {
    dispatch({ type: 'REMOVE_TODO', payload: todoToDelete.id });
    dispatch({ type: 'SET_TODO_TO_DELETE', payload: null });
  };

  const handleCancelDelete = () => {
    dispatch({ type: 'SET_TODO_TO_DELETE', payload: null });
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCancelDelete}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this task?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
