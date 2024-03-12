import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [{
    id: 0,
    title: "",
    status: null,
    created_at: "",
    updated_at: "string",
    is_deleted: null,
  }],
};

export const appSlice = createSlice({
  name: "Todo_Slice",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
    },
    updateTodo: (state, action) => {
      state.todos.find(todo => todo.id === action.payload.id)
    },
  },
});

export const { addTodo, updateTodo } = appSlice.actions;
