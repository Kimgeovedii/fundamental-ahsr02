"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState } from "react";
import axios from "axios";

interface ISignUpPageProps {}
interface IUserData {
  email: string;
  password: string;
}
const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const SIGNUP_ENDPOINT =
    "https://kemptdigestion-us.backendless.app/api/data/accounts";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const userData: IUserData = {
      email: email,
      password: password,
    };
    console.log(userData);
    try {
      const response = await axios.post(SIGNUP_ENDPOINT, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      setMessage(`🎉 Yeay akun ${data.email} berhasil dibuat`);
      console.log("Data akun", data);
      setEmail("");
      setPassword("");
    } catch (error) {
      let errorMessage = "terjadi kesalahan jaringan atau server";
      if (axios.isAxiosError(error) && error.response) {
        const serverError = error.response.data;
        errorMessage =
          serverError.message ||
          `Gagal membuat data. Status: ${error.response.status}`;
        console.error("Server Error:", serverError);
      } else {
        console.error("Unknown Error:", error);
      }

      setMessage(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-6 shadow rounded-2xl w-96 m-auto">
      <h2 className="text-xl font-bold mb-4 ">SIGN UP PAGE</h2>
      {message && (
        <p
          className={`mb-4 p-2 rounded text-sm ${
            message ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSignUp} className="space-y-4">
        <Input
          type="email"
          placeholder="input email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="w-full "
          disabled={loading || !email || !password}
        >
          {loading ? "Menyimpan Data" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};
export default SignUpPage;
