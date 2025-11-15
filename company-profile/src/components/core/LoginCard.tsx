"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/useAuthStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { error } = useAuthStore();
  const [errorMsg, setErrorMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email tidak valid")
        .required("email wajib diisi"),
      password: Yup.string().required("Password Wajib Diisi"),
    }),
    onSubmit: async (values) => {
      setErrorMsg("");

      const success = await login(values.email, values.password);

      if (!success) {
        // tampilkan error dari store
        setErrorMsg(error || "Login gagal. Periksa kembali email/password.");
        toast.error(error || "Login gagal.");
        return;
      }
      toast.success("Login sukses! Selamat datang 👋");
      router.push("/cms");
    },
  });
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link
            className="cursor-pointer text-primary underline-offset-4 hover:underline"
            href={"signup"}
          >
            Sign Up
          </Link>
        </CardAction>
        {errorMsg && (
          <p className="text-red-500 text-sm italic text-center">{errorMsg}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm italic">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  {...formik.getFieldProps("password")}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {" "}
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm italic">
                  {formik.errors.email}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={() => formik.handleSubmit()}
        >
          {isLoading ? (
            <div>
              <Spinner className="mr-2" />
              Looging In
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <FiLogIn className="mr-2" />
              Login
            </div>
          )}
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          <FcGoogle />
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
