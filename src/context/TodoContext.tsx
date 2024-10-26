import { createContext, useContext, useEffect, useState } from "react";

import { TodoType } from "../types/todoType";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const URL = "https://jsonplaceholder.typicode.com/todos?_limit=20";

function isTodoArray(data: any): data is TodoType[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        "userId" in item &&
        "id" in item &&
        "title" in item &&
        "completed" in item,
    )
  );
}

const initialState: TodoType[] = [];

const TodoContext = createContext({
  todoList: initialState,
  addTodoItem: (title: string) => {},
  deleteTodoItem: (todoId: number) => {},
  onTodoComplete: (todoId: number, checkValue: boolean) => {},
  isLoading: false,
  errMessage: "",
});

type TodoProvider = {
  children: React.ReactElement | React.ReactElement[];
};

function TodoProvider({ children }: TodoProvider) {
  const [todoList, setTodoList] = useLocalStorageState(
    "todoList",
    initialState,
  );

  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function addTodoItem(title: string) {
    const todo: TodoType = {
      userId: 1, // setting it to 1 since api always return userId: 1
      id: Date.now() + Math.floor(Math.random() * 10000),
      title,
      completed: false,
    };
    setTodoList((prev) => [todo, ...prev]);
  }

  function deleteTodoItem(todoId: number) {
    setTodoList((prev) => prev.filter((todoItem) => todoItem.id !== todoId));
  }

  function onTodoComplete(todoId: number, checkValue: boolean) {
    setTodoList((prev) =>
      prev.map((todoItem) =>
        todoId === todoItem.id
          ? { ...todoItem, completed: checkValue }
          : todoItem,
      ),
    );
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true)
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Something went wrong!. Try again later");
        }
        const data = await res.json();

        if (!isTodoArray(data)) {
          throw new Error("Data is not in the expected format");
        }

        setTodoList(data);
        setErrMessage("");
      } catch (err) {
        setErrMessage((err as Error).message);
      } finally {
        setIsLoading(false)
      }
    }

    // only fetch when user do not have an array of todos in local storage
    if (todoList.length === 0) {
      console.log("fetching started");
      fetchTodos();
    }
  });

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addTodoItem,
        deleteTodoItem,
        onTodoComplete,
        errMessage,
        isLoading
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);

  if (context === undefined)
    throw new Error("Todo Context was used outside of provider");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TodoProvider, useTodo };
