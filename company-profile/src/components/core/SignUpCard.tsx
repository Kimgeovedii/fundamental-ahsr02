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
import { useAuthStore } from "@/lib/stores";
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
      password: "",
    },
    validationSchema: Yup.object({
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
        values.password
      );

      if (!success) {
        setErrorMsg(error || "Terjadi kesalahan pada severs");
        toast.error(error || "Sign up gagal.");
        return;
      }
      router.push("/signup/confirm-email");
    },
  });
  return (
    <Card className="w-full max-w-sm p-2 bg-white dark:bg-gray-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create an account
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Fill the form below to register a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="text-gray-900 dark:text-white"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm italic">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="text-gray-900 dark:text-white"
                {...formik.getFieldProps("password")}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 -translate-y-1/2 top-1/2 text-gray-500 dark:text-gray-400 duration-300 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          {errorMsg && (
            <p className="text-red-500 dark:text-red-400 text-sm italic text-center">
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

        <Button variant="outline" className="w-full cursor-pointer border-gray-200 dark:border-gray-700">
          <FcGoogle className="mr-2" />
          Sign Up with Google
        </Button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4"
          >
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
