import * as React from "react";
import { LoginCard } from "@/components/core/LoginCard";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
