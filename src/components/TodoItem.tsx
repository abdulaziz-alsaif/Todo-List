import { TrashIcon } from "@heroicons/react/20/solid";

import { useTodo } from "../context/TodoContext";

import Checkbox from "./Checkbox";

import { TodoType } from "../types/todoType";

type TodoItemProps = {
  todo: TodoType;
};

function TodoItem({ todo }: TodoItemProps) {
  const { title, id, completed } = todo;

  const { deleteTodoItem } = useTodo();

  return (
    <li className="flex items-center gap-3 border-b border-zinc-800 px-4 py-2.5 transition-colors last:border-none hover:bg-zinc-800 has-[:checked]:opacity-50 has-[:checked]:bg-zinc-800">
      <Checkbox todoId={id} isCompleted={completed} />
      <p className="flex-1 text-lg font-medium peer-has-[:checked]:line-through">
        {title}
      </p>
      <button onClick={() => deleteTodoItem(id)}>
        <TrashIcon className="h-5 w-5 text-red-500" />
      </button>
    </li>
  );
}

export default TodoItem;
