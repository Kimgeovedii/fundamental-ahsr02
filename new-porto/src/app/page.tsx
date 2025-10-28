import Image from "next/image";
import bgImage from "@/assets/img/my-3.png";
import bgSvg from "@/assets/svg/main-card.svg";
import React from "react";
interface IbgImage {}
const Home: React.FunctionComponent<IbgImage> = () => {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-7">
        {" "}
        <h1 className=" text-8xl font-semibold text-white/75">Hai, There 🖐️</h1>
        <p className="text-xl text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="col-span-5 relative">
        <div className="px-8 w-full relative -top-20">
          <Image
            src={bgImage}
            alt=""
            width={300}
            className="absolute right-12 -top-22 z-10  "
          />
          <div
            className="absolute top-64 rounded-lg backdrop-blur-2xl right-12 w-[300px] z-999 h-5 
                bg-black/70  pointer-events-none"
          />
        </div>
        <Image src={bgSvg} alt="" width={400} className="absolute right-0" />
      </div>
    </div>
  );
};
export default Home;
