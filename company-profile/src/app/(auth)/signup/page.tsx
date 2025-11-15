import { SignUpCard } from "@/components/core/SignUpCard";
import * as React from "react";

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
