
export type Todo = {
    id: number;
    text: string;
    completed: boolean;
  };
  
  export type State = {
    todos: Todo[];
    todoToEdit: Todo | null;
    todoToDelete: Todo | null;
  };
  
  export type Action =
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'REMOVE_TODO'; payload: number }
    | { type: 'SET_TODO_TO_EDIT'; payload: Todo | null }
    | { type: 'UPDATE_TODO'; payload: Todo }
    | { type: 'SET_TODO_TO_DELETE'; payload: Todo | null };
  