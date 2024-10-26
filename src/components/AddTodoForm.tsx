import { useState } from "react";

import { useTodo } from "../context/TodoContext";

function AddTodoForm() {
  const { addTodoItem } = useTodo()

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (title.trim().length === 0) {
      setError("Invalid input. Please add Title");
      return;
    }

    addTodoItem(title);
    setTitle("");
    setError("");
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-zinc-800 bg-transparent px-3 py-1 text-sm placeholder-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          className="inline-flex rounded-md bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-900 hover:opacity-95 disabled:pointer-events-none disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {error !== "" && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default AddTodoForm;
