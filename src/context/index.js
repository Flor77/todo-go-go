import { useState, createContext } from "react";

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  return (
    <TodoContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
