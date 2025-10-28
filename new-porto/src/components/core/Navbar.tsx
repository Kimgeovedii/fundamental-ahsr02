import { CircuitBoard, Search } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface INavbar {}

const Navbar: React.FunctionComponent<INavbar> = () => {
  return (
    <div className="flex justify-between  text-white/75">
      <div className="flex gap-2">
        <CircuitBoard />
        <p>Kim Geovedi</p>
      </div>
      <ul className="flex justify-between w-1/4">
        {["Home", "Portofolio", "Contact", "About"].map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:opacity-80 hover:scale-110 transition duration-300"
          >
            <Button>{item}</Button>
          </li>
        ))}
      </ul>
      <div className="flex">
        <Search />
      </div>
    </div>
  );
};

export default Navbar;
