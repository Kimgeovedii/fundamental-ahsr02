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
import Link from "next/link";

import { toast, Toaster } from "sonner";

interface SignInCredentials {
  name: string;
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid.")
    .required("Email wajib diisi."),
  password: Yup.string().required("Password wajib diisi."),
});

const SignInForm: React.FC = () => {
  const router = useRouter();
  const { isSigningIn, signInError, userToken, userName, signIn } =
    useAuthStore();

  const formik = useFormik<SignInCredentials>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await signIn(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (userToken) {
      toast.success(`Selamat datang kembali, ${userName || "Pengguna"}!`, {
        description: "Mengarahkan ke Dashboard…",
      });

      timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userToken, router, userName]);

  useEffect(() => {
    if (signInError) {
      toast.error(`Login gagal: ${signInError}`);
    }
  }, [signInError]);

  return (
    <>
      <Toaster />

      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold text-fuchsia-700">
            Login ke Akun Anda
          </CardTitle>
          <CardDescription className="text-gray-600">
            Masukkan email dan kata sandi Anda untuk masuk.
          </CardDescription>
        </CardHeader>

        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                  disabled={isSigningIn || !!userToken}
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
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm text-fuchsia-700 underline-offset-4 hover:underline"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={isSigningIn || !!userToken}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-fuchsia-700 text-white hover:bg-fuchsia-800 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer"
              disabled={isSigningIn || !!userToken}
            >
              {isSigningIn ? "Masuk..." : "Login"}
            </Button>

            {/* <Button
              variant="outline"
              className="w-full text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSigningIn || !!userToken}
            >
              Login dengan Google
            </Button> */}

            <div className="mt-4 text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/signup"
                className="text-fuchsia-700 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default SignInForm;
