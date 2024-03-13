import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 0,
      title: "",
      status: null,
      created_at: "",
      updated_at: "string",
      is_deleted: false,
    },
  ],
  checkbox: [],
  todosChanged: [],
  isConfirmed: false,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    getTodo: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
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
      for (let i = 0; i < state.todos.length; i++) {
        for (let j = 0; j < updatedTodos.length; j++) {
          if (state.todos[i].id === updatedTodos[j].id) {
            state.todos[i] = updatedTodos[j];
          }
        }
      }
    },
    chooseTodo: (state, action) => {
      const existingItemIndex = state.checkbox.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.checkbox.splice(existingItemIndex, 1);
      } else {
        state.checkbox.push(action.payload);
      }
    },
    changeTodos: (state, action) => {
      state.todosChanged = action.payload;
    },
    confirm: (state, action) => {
      state.isConfirmed = !action.payload;
    },
  },
});

export const {
  getTodo,
  addTodo,
  updateTodo,
  chooseTodo,
  changeTodos,
  confirm,
} = appSlice.actions;
export default appSlice.reducer;
