"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/useAuthStore";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export function SignUpCard() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const { error, user } = useAuthStore();
  const isLoading = useAuthStore((state) => state.isLoading);
  const [errorMsg, setErrorMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username wajib diisi"),
      email: Yup.string()
        .email("email tidak valid")
        .required("email wajib diisi"),
      password: Yup.string()
        .min(6, "Password Minimal 6 Karakter")
        .required("password wajib diisi"),
    }),
    onSubmit: async (values) => {
      setErrorMsg("");
      const success = await signup(
        values.email,
        values.password,
        values.username
      );

      if (!success) {
        // tampilkan error dari store
        setErrorMsg(error || "Terjadi kesalahan pada severs");
        toast.error(error || "Login gagal.");
        return;
      }
      toast.success("Sign Up berhasil! Cek email kamu untuk verifikasi akun.");
      router.push("/login");
    },
  });
  return (
    <Card className="w-full max-w-sm p-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">
          Create an account
        </CardTitle>
        <CardDescription>
          Fill the form below to register a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="your username"
              required
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm italic">
                {formik.errors.username}
              </p>
            )}
          </div>

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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                {...formik.getFieldProps("password")}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 -translate-y-1/2 top-1/2 text-gray-500 duration-300 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          {errorMsg && (
            <p className="text-red-500 text-sm italic text-center">
              {errorMsg}
            </p>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-4">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={() => formik.handleSubmit()}
        >
          {isLoading ? (
            <div className="flex flex-row items-center">
              <Spinner />
              Sending Data...
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <FiUserPlus className="mr-2" /> Sign Up{" "}
            </div>
          )}
        </Button>

        <Button variant="outline" className="w-full cursor-pointer">
          <FcGoogle className="mr-2" />
          Sign Up with Google
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
