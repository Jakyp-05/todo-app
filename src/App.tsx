import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "./models/model";
import TodoItem from "./components/TodoItem";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      const newTodo: ITodo = {
        id: new Date(),
        title: todo,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const handleDelete = (id: Date) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (newTodo: ITodo) => {
    setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)))
  };

  return (
    <div className="w-[500px] mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-[440px] mx-auto border"
      >
        <input
          type="text"
          className="w-[400px] outline-none px-2"
          placeholder="...."
          name="title"
          value={todo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-[40px] h-[40px] bg-[#13E328] text-white text-4xl flex items-center justify-center"
        >
          +
        </button>
      </form>
      <div className="flex mt-6 w-[440px] mx-auto">
        <button className="w-[124px] h-[30px] mr-8 bg-[#8F8F8F] text-white rounded-md text-sm">
          All
        </button>
        <button className="w-[124px] h-[30px] border mr-10 rounded-md text-[#5c5c5c] text-sm">
          Completed
        </button>
        <button className="w-[124px] h-[30px] border rounded-md text-[#5c5c5c] text-sm">
          Pending
        </button>
      </div>
      <TodoItem todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
