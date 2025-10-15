"use client";

import { useRef, useState } from "react";

const ManageData = () => {
  const angka1 = useRef<HTMLInputElement>(null);
  const angka2 = useRef<HTMLInputElement>(null);
  const [hasil, setHasil] = useState<number>(0);

  const hitung = (operator: string) => {
    const a = parseFloat(angka1.current?.value || "0");
    const b = parseFloat(angka2.current?.value || "0");

    switch (operator) {
      case "+":
        setHasil(a + b);
        break;
      case "-":
        setHasil(a - b);
        break;
      case "/":
        setHasil(b !== 0 ? a / b : NaN);
        break;
      case "*":
        setHasil(a * b);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] text-black">
      <h1 className="text-xl mb-4 font-semibold text-white">ManageData</h1>

      <form className="bg-gray-300 flex flex-col items-center p-10 rounded-2xl shadow-2xl">
        <div className="flex gap-5 mb-4">
          <div>
            <label className="block text-gray-700">Angka 1</label>
            <input
              type="number"
              placeholder="Input Angka 1"
              ref={angka1}
              className="border border-gray-800 rounded-2xl p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Angka 2</label>
            <input
              type="number"
              placeholder="Input Angka 2"
              ref={angka2}
              className="border border-gray-800 rounded-2xl p-2"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {["+", "-", "/", "*"].map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => hitung(op)}
              className="bg-green-300 w-12 rounded-2xl px-2 py-2 hover:opacity-75 hover:text-white"
            >
              {op}
            </button>
          ))}
        </div>
      </form>

      <div className="mt-4 text-lg text-white font-semibold">
        Hasil: {isNaN(hasil) ? "Error" : hasil}
      </div>
    </div>
  );
};

export default ManageData;
