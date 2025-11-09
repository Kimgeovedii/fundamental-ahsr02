"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Username minimal 6 Karakter")
    .required("Email wajib diisi."),
  email: Yup.string()
    .email("Format email tidak valid.")
    .required("Email wajib diisi."),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter.")
    .required("Password wajib diisi."),
});

const SignUpForm = () => {
  const router = useRouter();
  const { isSigningUp, signUpError, isSignedUp, signUp, resetState } =
    useAuthStore();

  const formik = useFormik<SignUpCredentials>({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await signUp(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSignedUp) {
      toast.success("Akun berhasil dibuat! Mengarahkan ke login...");
      timer = setTimeout(() => {
        resetState();
        router.push("/login");
      }, 1500);
    }

    if (signUpError) {
      if (signUpError.includes("User already exists")) {
        toast.error("Email sudah terdaftar. Gunakan email lain.");
      } else {
        toast.error(`Pendaftaran gagal: ${signUpError}`);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSignedUp, signUpError, router, resetState]);

  return (
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-extrabold text-fuchsia-700">
          Buat Akun Baru
        </CardTitle>
        <CardDescription className="text-gray-600">
          Masukkan email dan kata sandi Anda untuk mendaftar.
        </CardDescription>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">User Name</Label>
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="input username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={isSigningUp || isSignedUp}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled={isSigningUp || isSignedUp}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Kata Sandi</Label>
                <p className="ml-auto inline-block text-sm text-black-700 ">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="text-fuchsia-700 underline-offset-4 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={isSigningUp || isSignedUp}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-5">
          <Button
            type="submit"
            className="w-full bg-fuchsia-700 text-white hover:bg-fuchsia-800 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
            disabled={isSigningUp || isSignedUp}
          >
            {isSigningUp ? "Mendaftar..." : "Sign Up"}
          </Button>

          {/* <Button
            variant="outline"
            className="w-full text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSigningUp || isSignedUp}
          >
            Sign Up dengan Google
          </Button> */}
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
