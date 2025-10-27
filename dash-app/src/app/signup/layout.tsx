import * as React from "react";

interface ISignUpLayoutProps {
  children: React.ReactNode;
}
const SignUpLayout: React.FunctionComponent<ISignUpLayoutProps> = (props) => {
  return (
    <div className="min-h-screen py-32">
      <main>{props.children}</main>
    </div>
  );
};
export default SignUpLayout;
