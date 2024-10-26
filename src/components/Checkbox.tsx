import { CheckIcon } from "@heroicons/react/20/solid";
import { useTodo } from "../context/TodoContext";

type CheckboxProps = {
  todoId: number,
  isCompleted: boolean,
}

function Checkbox({ todoId, isCompleted}: CheckboxProps) {
  const { onTodoComplete } = useTodo()

  return (
    <div className="inline-flex items-center peer">
      <label className="relative flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-50 shadow transition-all checked:border-none checked:bg-zinc-50 hover:shadow-md"
          id="check"
          checked={isCompleted}
          onChange={(e) => onTodoComplete(todoId, e.target.checked)}
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-zinc-50 opacity-0 peer-checked:opacity-100">
          <CheckIcon className="text-zinc-950 w-5 h-5"/>
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
