"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
interface ISignInPageProps {}
interface IUserData {
  email: string;
  password: string;
}
const SignInPage: React.FunctionComponent<ISignInPageProps> = (props) => {
  const passRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: IUserData = {
      email: emailRef.current?.value ?? "",
      password: passRef.current?.value ?? "",
    };

    if (payload) {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/data/Users`, {
        params: {
          where: `email = '${payload.email}'`,
        },
      });
      console.log("response api", res.data);
    }
  };
  return (
    <div>
      <div className="bg-white p-6 shadow rounded-2xl w-96 m-auto">
        <h2 className="text-xl font-bold mb-4 ">SIGN IN PAGE</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="input email"
            // value={}
            // onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            required
          />
          <Input
            type="password"
            placeholder="input password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            ref={passRef}
            required
          />
          <Button
            type="submit"
            className="w-full "
            // disabled={loading || !email || !password}
          >
            {/* {loading ? "Menyimpan Data" : "Sign Up"} */}
            SIGN IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
