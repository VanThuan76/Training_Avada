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
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialState,
  reducers: {
    getTodo: (state, action) => {
      state.todos = action.payload
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    updateTodo: (state, action) => {
      state.todos.find((todo) => todo.id === action.payload.id);
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
  },
});

export const { getTodo, addTodo, updateTodo, chooseTodo } = appSlice.actions;
export default appSlice.reducer;
