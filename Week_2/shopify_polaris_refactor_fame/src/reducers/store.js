import { createContext } from "react";

const ThemeContext = createContext();
export const initialState = {
  theme: "light",
  language: "en",
  todos: [],
  checkbox: [],
  todosChanged: [],
  isConfirmed: false,
  isLoading: true,
};
const ReducerProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={initialState}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ReducerProvider;
