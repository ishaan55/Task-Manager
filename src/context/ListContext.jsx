import { createContext, useContext } from "react";

export const ListContext = createContext({
  lists: {},
  addTask: (task, title) => {},
  removeTask: (i, title) => {},
});

export const ListProvider = ListContext.Provider;

export const useList = () => {
  return useContext(ListContext);
};
