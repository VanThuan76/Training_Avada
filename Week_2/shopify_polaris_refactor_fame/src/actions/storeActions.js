import { initialState } from "@avada/reducers/store";

export const storeTypes = {
  GET_TODO: "GET_TODO",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  CHOOSE_TODO: "CHOOSE_TODO",
  CHANGE_TODOS: "CHANGE_TODOS",
  CONFIRM: "CONFIRM",
  SET_LOADING: "SET_LOADING",
};

export const reducerSlice = (state = initialState, action) => {
  switch (action.type) {
    case storeTypes.GET_TODO:
      return { ...state, todos: action.payload };
    case storeTypes.ADD_TODO:
      return { ...state, todos: [action.payload, ...state.todos] };
    case storeTypes.UPDATE_TODO:
      const updatedTodos = action.payload.map((updatedTodoData) => {
        const todoIndex = state.todos.findIndex(
          (todo) => todo.id === updatedTodoData.id
        );
        if (todoIndex !== -1) {
          return {
            ...state.todos[todoIndex],
            ...updatedTodoData,
          };
        } else {
          return updatedTodoData;
        }
      });
      const updatedStateTodos = state.todos.map((todo) => {
        const updatedTodo = updatedTodos.find(
          (updatedTodo) => updatedTodo.id === todo.id
        );
        return updatedTodo ? updatedTodo : todo;
      });
      return { ...state, todos: updatedStateTodos };
    case storeTypes.CHOOSE_TODO:
      const existingItemIndex = state.checkbox.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedCheckbox =
        existingItemIndex !== -1
          ? state.checkbox.filter((item) => item.id !== action.payload.id)
          : [...state.checkbox, action.payload];
      return { ...state, checkbox: updatedCheckbox };
    case storeTypes.CHANGE_TODOS:
      return { ...state, todosChanged: action.payload };
    case storeTypes.CONFIRM:
      return { ...state, isConfirmed: !action.payload };
    case storeTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export function setLoading(dispatch, payload = true) {
  dispatch({ type: storeTypes.SET_LOADING, payload: payload });
}
export function setConfirm(dispatch, payload) {
  dispatch({ type: storeTypes.CONFIRM, payload: payload });
}

export function setChangeTodos(dispatch, payload) {
  dispatch({ type: storeTypes.CHANGE_TODOS, payload: payload });
}
