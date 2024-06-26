import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { ITodo } from "../models/model";

interface closeProps {
  close: (value: boolean) => void;
  todo: ITodo;
  edit: (newTodo: ITodo) => void;
}

const TodoEdit: FC<closeProps> = ({ close, todo, edit }) => {
  const [editText, setEditText] = useState<ITodo>(todo);
  console.log(editText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditText({
      ...editText,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title } = editText;

    if (title) {
      edit(editText);
      close(false);
    }
  };

  return (
    <div className="w-[100%] absolute border top-[-25%] right-[0%] ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-[440px] mx-auto border"
      >
        <input
          type="text"
          className="w-[400px] outline-none px-2"
          placeholder="...."
          name="title"
          value={editText.title}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-[200px] h-[40px] bg-[#13E328] text-white text-2xl flex items-center justify-center"
        >
          update
        </button>
      </form>
      <button
        className="w-200px bg-red-600 px-4 py-2 mt-2 text-white rounded"
        onClick={() => close(false)}
      >
        Close
      </button>
    </div>
  );
};

export default TodoEdit;
