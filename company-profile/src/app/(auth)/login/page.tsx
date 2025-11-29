import * as React from "react";
import { LoginCard } from "@/components/core/LoginCard";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <div className="grid grid-cols-2 w-screen h-screen">
      <div
        className="w-full h-full flex flex-col justify-center items-center p-12"
        style={{
          backgroundImage: "url('/img/corporate.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div
          className="
          w-full max-w-lg p-10 
          rounded-2xl 
          shadow-2xl 
          border border-white/30 
          bg-white/10        
          backdrop-blur-xl     
          backdrop-saturate-150 
          
          text-white 
          text-center
        "
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
            DIGIFORMA
          </h1>

          <p className="text-xl font-light leading-relaxed text-white/90 drop-shadow-md">
            Partner Digitalisasi Bisnis B2B Anda.
            <br />
            Transformasi dimulai di sini.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col w-full h-full bg-gray-50">
        <LoginCard />
        <div className="text-center p-4 pt-2 border-t border-gray-100 mt-4">
          <p className="text-xs text-gray-400">
            © 2025 Digiforma Tech Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
