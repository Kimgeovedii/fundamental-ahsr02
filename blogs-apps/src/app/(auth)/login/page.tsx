"use client";
import SignInForm from "@/components/core/SignForm";
import * as React from "react";

interface ISignInPageProps {}

const SignInPage: React.FunctionComponent<ISignInPageProps> = (props) => {
  return (
    <div className="w-screen h-screen z-0 flex justify-center items-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
