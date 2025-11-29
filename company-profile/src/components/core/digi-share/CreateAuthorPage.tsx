"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { User, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores";
import { authorService } from "@/lib/services/authorService";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";

interface CreateAuthorPageData {
  title: string;
  description: string;
  name_label: string;
  name_placeholder: string;
  bio_label: string;
  bio_placeholder: string;
  avatar_label: string;
  create_button: string;
  name_required: string;
  name_min_length: string;
  success_message: string;
  error_message: string;
}

const CreateAuthorPage = () => {
  const router = useRouter();
  const { user, checkSession } = useAuthStore();
  const { lang, hydrated } = useHydratedLanguageStore();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [pageData, setPageData] = React.useState<CreateAuthorPageData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.create_author_page) {
            setPageData(data.create_author_page as CreateAuthorPageData);
          }
        })
        .catch(() => {
          // Silent fail - locale will use default
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  React.useEffect(() => {
    const checkAuthor = async () => {
      if (!user?.id) {
        router.push("/login");
        return;
      }

      setLoading(true);
      try {
        const existingAuthor = await authorService.getByUserId(user.id);
        if (existingAuthor) {
          router.push("/digi-share/posts");
          return;
        }
      } catch (error) {
        // Silent fail - error will be handled by redirect
      } finally {
        setLoading(false);
      }
    };

    if (user && hydrated) {
      checkAuthor();
    } else if (!user) {
      router.push("/login");
    }
  }, [user, hydrated, router]);

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(pageData?.name_required || "Name is required")
        .min(2, pageData?.name_min_length || "Name must be at least 2 characters"),
      bio: Yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!user?.id) {
        toast.error("User not found. Please login again.");
        router.push("/login");
        return;
      }

      setSaving(true);
      try {
        let avatarUrl: string | null = null;

        if (avatarFile) {
          try {
            avatarUrl = await authorService.uploadAvatar(avatarFile, user.id);
          } catch (error) {
            toast.error("Failed to upload avatar");
          }
        }

        let author;
        let retries = 0;
        const maxRetries = 3;

        while (retries < maxRetries) {
          try {
            author = await authorService.create({
              user_id: user.id,
              name: values.name,
              avatar: avatarUrl,
              bio: values.bio || null,
            });
            break;
          } catch (error: any) {
            if (error.code === "23503" && retries < maxRetries - 1) {
              retries++;
              const waitTime = 2000 * retries;
              await new Promise((resolve) => setTimeout(resolve, waitTime));
              continue;
            }
            throw error;
          }
        }

        await checkSession();
        toast.success(pageData?.success_message || "Author profile created successfully!");
        router.push("/digi-share/posts");
      } catch (error: any) {
        toast.error(error.message || pageData?.error_message || "Failed to create author profile");
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name?: string): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  if (isLoadingLocale || !hydrated || loading || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 text-white py-16 md:py-20 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
              {pageData.title}
            </h1>
            <p className="text-lg text-blue-100 dark:text-blue-200">
              {pageData.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8"
          >
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-24 w-24 border-4 border-gray-200 dark:border-gray-700">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Avatar" />
                  ) : null}
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                    {getInitials(formik.values.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="avatar" className="flex items-center gap-2 cursor-pointer">
                    <ImageIcon className="w-4 h-4" />
                    {pageData.avatar_label}
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleAvatarChange}
                    className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                  {avatarFile && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {avatarFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {pageData.name_label} *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={pageData.name_placeholder}
                  {...formik.getFieldProps("name")}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio">
                  {pageData.bio_label}
                </Label>
                <Textarea
                  id="bio"
                  rows={4}
                  placeholder={pageData.bio_placeholder}
                  {...formik.getFieldProps("bio")}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-red-500 text-sm">{formik.errors.bio}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {saving ? (
                    <>
                      <Spinner className="mr-2" />
                      Creating...
                    </>
                  ) : (
                    pageData.create_button
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CreateAuthorPage;

