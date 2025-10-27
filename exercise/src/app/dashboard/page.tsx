"use client";

import React, { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { Trash, Ban, SaveAll, Check, MoonStar, Sun } from "lucide-react";
import Cookies from "js-cookie";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
const COOKIE_NAME = "darkModeEnabled";

const Page: FC = () => {
  const initialDarkState = Cookies.get(COOKIE_NAME) === "true";
  const [dark, setDark] = useState(initialDarkState);
  const newTodo = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Complete online JavaScript course", completed: true },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [completed, setCompleted] = useState(false);
  const createNewInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.trim();
      if (!input.trim()) return;
      const nextId =
        todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
      const NewItem: Todo = {
        id: nextId,
        text: value,
        completed: false,
      };
      setTodos((prev) => [...prev, NewItem]);
      setInput("");
    }
  };
  const handleEditClick = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };
  const handleEditSubmit = (id: number) => {
    if (!editText.trim()) {
      handleDelete(id);
    }
    setTodos((prev) =>
      prev.map((todo) => (todo.id == id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEditButton = () => {
    setEditingId(null);
    setEditText("");
  };

  const toggleCompleted = (id: number) => {
    console.log(setTodos);
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  const handleFilterActive = () => {
    alert("filter active");
  };
  const handleFilterComplete = () => {
    alert("filter completed");
  };
  useEffect(() => {
    // Simpan nilai 'dark' (true/false) sebagai string ke cookie
    Cookies.set(COOKIE_NAME, String(dark), {
      expires: 365, // Contoh: cookie berlaku selama 365 hari
      sameSite: "Lax", // Pengaturan keamanan
    });

    // Tambahkan kelas gelap (dark) ke elemen <html> untuk efek global
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return (
    <main
      className={`flex flex-col items-center min-h-screen  text-[#333] ${
        dark ? "bg-[#f9f9fb]" : " bg-slate-800"
      }`}
    >
      {/* Banner Section */}
      <div
        className="w-full h-[300px] bg-cover bg-center pt-[70px] flex justify-center"
        style={{
          backgroundImage: "url('/assets/bg-img/Bitmap.svg')",
        }}
      >
        <div className="w-[500px] flex justify-between items-center z-0 mb-[80px]">
          <h1 className="text-white text-[36px] tracking-[10px] font-extrabold">
            TODO
          </h1>
          <button
            onClick={() => setDark((prevDark) => !prevDark)}
            className="text-white text-[26px] cursor-pointer 
             relative w-8 h-8 flex items-center justify-center"
          >
            <Sun
              color="#ffffff"
              className={`absolute transition-opacity duration-500 ease-in-out ${
                dark ? "opacity-0" : "opacity-100"
              }`}
            />
            <MoonStar
              color="#ffffff"
              className={`absolute transition-opacity duration-500 ease-in-out ${
                dark ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Container */}
      <div className="w-[500px] -mt-[100px] px-2">
        {/* Input Field */}
        <div className="bg-white rounded-[6px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] p-4 flex items-center mb-5">
          <div className="w-[20px] h-[20px] border border-[#ccc] rounded-full mr-4" />
          <input
            type="text"
            placeholder="Create a new todo..."
            className="flex-1 border-none outline-none placeholder:text-[#777] text-[#777] text-sm bg-transparent"
            ref={newTodo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={createNewInput}
          />
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-[6px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] overflow-hidden">
          {todos.map((todo: Todo) => (
            <div className="flex justify-between pr-5 items-center">
              <div
                key={todo.id}
                className={`flex items-center text-left justify-between p-4 w-full border-b border-[#eee] text-sm ${
                  todo.completed ? "line-through text-[#bbb]" : "text-[#555]"
                }`}
              >
                <div
                  onClick={() => toggleCompleted(todo.id)}
                  className={`w-[20px] h-[20px] rounded-full mr-4 flex items-center justify-center ${
                    todo.completed
                      ? "bg-gradient-to-r from-[#57ddff] to-[#c058f3] border-0"
                      : "border border-[#ccc]"
                  }`}
                >
                  {todo.completed && (
                    <span className="text-white text-[12px]">
                      <Check width={15} />
                    </span>
                  )}
                </div>
                {editingId === todo.id ? (
                  <form
                    className="rounded-2xl w-full"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditSubmit(todo.id);
                    }}
                  >
                    <input
                      type="text"
                      autoFocus
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full"
                    />
                  </form>
                ) : (
                  <div
                    id="text"
                    className="text-left  w-full"
                    onClick={() => handleEditClick(todo.id, todo.text)}
                  >
                    {todo.text}
                  </div>
                )}
              </div>
              {editingId === todo.id ? (
                <div className="flex flex-row items-center gap-2">
                  <button
                    type="submit"
                    className="w-fit cursor-pointer hover:opacity-80 hover:scale-110 duration-300"
                    onClick={() => handleEditSubmit(todo.id)}
                  >
                    <SaveAll width={20} />
                  </button>
                  <button
                    onClick={cancelEditButton}
                    className="w-fit cursor-pointer hover:opacity-80 hover:scale-110 duration-300"
                  >
                    <Ban width={20} />
                  </button>
                </div>
              ) : (
                <button onClick={() => handleDelete(todo.id)} type="button">
                  <Trash
                    width={20}
                    className="cursor-pointer hover:opacity-80 hover:scale-110 duration-300"
                  />
                </button>
              )}
            </div>
          ))}

          {/* Footer */}
          <div className="flex justify-between items-center p-3 text-xs text-[#999]">
            <span>5 items left</span>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleFilterActive()}
                className="text-[#4a73e4] font-semibold text-xs"
              >
                All
              </button>
              <button type="button" className="text-xs text-[#666]">
                Active
              </button>
              <button
                type="button"
                onClick={() => handleFilterComplete()}
                className="text-xs text-[#666] cursor-pointer"
              >
                Completed
              </button>
            </div>

            <button type="button" className="text-xs">
              Clear Completed
            </button>
          </div>
        </div>

        <p className="text-center text-[#aaa] text-xs mt-8">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
};

export default Page;
