import React from "react";

/**
 * Prop type untuk CustomCheckbox.
 */
interface CustomCheckboxProps {
  checked: boolean;
}

/**
 * Komponen Checkbox Kustom Statis (Hanya untuk tampilan).
 * @param {CustomCheckboxProps} props - Menerima status checked.
 */
export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked }) => {
  return (
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center border transition duration-300 ease-in-out cursor-default ${
        checked
          ? "bg-gradient-to-br from-[#57ddff] to-[#c058f3] border-none"
          : "border-[#E4E5F1] hover:border-[#57ddff]/50"
      }`}
    >
      {/* Ikon centang (Hanya terlihat jika checked) */}
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          className="fill-none stroke-white stroke-2"
        >
          <path d="M1 4.304L3.696 7l6-6" />
        </svg>
      )}
    </div>
  );
};
