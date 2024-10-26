import TodoItem from "./TodoItem";

import { TodoType } from "../types/todoType";

type TodoListProps = {
  todoList: TodoType[];
};

function TodoList({ todoList } : TodoListProps) {
  return (
    <ul className="rounded-md border border-zinc-800">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
