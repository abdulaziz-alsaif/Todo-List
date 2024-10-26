import { useState } from "react";

import { useTodo } from "./context/TodoContext";

import AddTodoForm from "./components/AddTodoForm";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";
import Spinner from "./components/Spinner";

function App() {
  const { todoList, isLoading } = useTodo();

  const [currentFilter, setCurrentFilter] = useState("all");

  let filteredTodoList = todoList;

  if (currentFilter === "completed") {
    filteredTodoList = todoList.filter((todo) => todo.completed);
  }

  if (currentFilter === "pending") {
    filteredTodoList = todoList.filter((todo) => !todo.completed);
  }

  return (
    <main className="container mx-auto min-h-screen">
      <div className="mx-auto mt-12 w-full space-y-12 p-8 md:w-[44rem]">
        <h1 className="text-center text-3xl font-bold">Stay on Track</h1>

        <div className="space-y-6">
          <AddTodoForm />
          <Filters
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />
        </div>

        {!isLoading ? <TodoList todoList={filteredTodoList} /> : <Spinner />}
      </div>
    </main>
  );
}

export default App;
