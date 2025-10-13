import React from "react";
import { CustomCheckbox } from "./CustomCheckbox"; // Import dari path relatif dalam folder components

/**
 * Prop type untuk Todo.
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

/**
 * Komponen Item To Do Statis.
 * @param {TodoItemProps} props - Menerima objek todo statis.
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // Styling berdasarkan status statis
  const textColor = todo.completed
    ? "text-[#D2D3DB] line-through"
    : "text-[#484B6A]";

  return (
    <li className="flex items-center p-5 border-b border-[#E3E4F1] group cursor-default">
      <div className="pr-4 sm:pr-6 flex-shrink-0">
        {/* Menggunakan CustomCheckbox yang diimpor */}
        <CustomCheckbox checked={todo.completed} />
      </div>

      {/* Teks To Do */}
      <span
        className={`flex-grow text-sm sm:text-lg transition duration-300 ${textColor}`}
      >
        {todo.text}
      </span>

      {/* Tombol Hapus (ikon silang) - Hanya untuk tampilan */}
      <button
        className="ml-4 text-gray-400 opacity-0 group-hover:opacity-100 transition duration-200"
        aria-label={`Hapus tugas: ${todo.text}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="fill-[#484B6A] hover:fill-[#E4E5F1]"
        >
          <path
            fillRule="evenodd"
            d="M16.97 0l.708.708L9.707 9.5 17.677 17.47l-.708.708-7.97-7.97-7.97 7.97L.708 17.47l7.97-7.97L.708 1.414.708.707 1.414 0 9.5 7.97 17.586.707 16.97 0z"
          />
        </svg>
      </button>
    </li>
  );
};
