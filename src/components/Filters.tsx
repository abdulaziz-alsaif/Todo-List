type Filter = {
  label: string;
  value: string;
};

const filters: Filter[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

type FiltersProp = {
  currentFilter: string;
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};

function Filters({ currentFilter, onFilterChange }: FiltersProp) {
  return (
    <div className="flex items-center justify-end space-x-2">
      {filters.map((filter) => (
        <button
          className={`h-7 rounded-full bg-transparent px-4 text-center text-sm text-zinc-400 transition-colors hover:text-zinc-100 ${currentFilter === filter.value ? "bg-zinc-800 font-medium text-zinc-50" : ""}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filters;
