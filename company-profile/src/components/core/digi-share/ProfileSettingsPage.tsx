"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/stores";
import { authorService } from "@/lib/services/authorService";
import { authService } from "@/lib/services/authService";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHydratedLanguageStore } from "@/lib/stores/language-store";
import { getLocale } from "@/lib/get-locale";
import { Author } from "@/lib/types/author";

interface ProfileSettingsPageData {
  title: string;
  profile_section: {
    title: string;
    name_label: string;
    bio_label: string;
    avatar_label: string;
  };
  credentials_section: {
    title: string;
    email_label: string;
    current_password_label: string;
    new_password_label: string;
    confirm_password_label: string;
  };
  save_button: string;
  cancel_button: string;
  success_message: string;
  error_message: string;
}

const ProfileSettingsPage = () => {
  const router = useRouter();
  const { user, checkSession } = useAuthStore();
  const { lang, hydrated } = useHydratedLanguageStore();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [author, setAuthor] = React.useState<Author | null>(null);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [pageData, setPageData] = React.useState<ProfileSettingsPageData | null>(null);
  const [isLoadingLocale, setIsLoadingLocale] = React.useState(true);

  React.useEffect(() => {
    if (hydrated) {
      setIsLoadingLocale(true);
      getLocale(lang)
        .then((data: any) => {
          if (data && data.profile_settings_page) {
            setPageData(data.profile_settings_page as ProfileSettingsPageData);
          }
        })
        .catch((error) => {
          console.error("Failed to load profile settings page locale data:", error);
        })
        .finally(() => {
          setIsLoadingLocale(false);
        });
    }
  }, [lang, hydrated]);

  React.useEffect(() => {
    const fetchAuthor = async () => {
      if (!user?.authorId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const authorData = await authorService.getById(user.authorId);
        setAuthor(authorData);
        if (authorData?.avatar) {
          setAvatarPreview(authorData.avatar);
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [user]);

  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: author?.name || "",
      bio: author?.bio || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
      bio: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (!user?.authorId) return;

      setSaving(true);
      try {
        let avatarUrl = author?.avatar || null;

        if (avatarFile) {
          if (author?.avatar) {
            await authorService.deleteAvatar(author.avatar);
          }
          avatarUrl = await authorService.uploadAvatar(avatarFile, user.id);
        }

        await authorService.update(user.authorId, {
          name: values.name,
          bio: values.bio || null,
          avatar: avatarUrl,
        });

        await checkSession();
        toast.success(pageData?.success_message || "Profile updated successfully");
        setAvatarFile(null);
      } catch (error: any) {
        console.error("Failed to update profile:", error);
        toast.error(error.message || pageData?.error_message || "Failed to update profile");
      } finally {
        setSaving(false);
      }
    },
  });

  const credentialsFormik = useFormik({
    initialValues: {
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      currentPassword: Yup.string().when(["newPassword", "confirmPassword"], {
        is: (newPassword: string, confirmPassword: string) => newPassword || confirmPassword,
        then: (schema) => schema.required("Current password is required"),
        otherwise: (schema) => schema,
      }),
      newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      if (!user) return;

      setSaving(true);
      try {
        if (values.newPassword) {
          const { data, error } = await (await import("@/lib/supabase/client")).supabase.auth.updateUser({
            password: values.newPassword,
          });

          if (error) throw error;

          if (values.email !== user.email) {
            const { error: emailError } = await (await import("@/lib/supabase/client")).supabase.auth.updateUser({
              email: values.email,
            });
            if (emailError) throw emailError;
          }

          toast.success(pageData?.success_message || "Credentials updated successfully");
          credentialsFormik.resetForm({
            values: {
              email: values.email,
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            },
          });
        } else if (values.email !== user.email) {
          const { error: emailError } = await (await import("@/lib/supabase/client")).supabase.auth.updateUser({
            email: values.email,
          });
          if (emailError) throw emailError;
          toast.success(pageData?.success_message || "Email updated successfully");
        }
      } catch (error: any) {
        console.error("Failed to update credentials:", error);
        toast.error(error.message || pageData?.error_message || "Failed to update credentials");
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

  if (!user?.authorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-20">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Author profile not found. Please contact support.
          </p>
          <Link href="/digi-share">
            <Button>Go to Digi-Share</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href={`/digi-share/profile/${user.authorId}`}>
            <Button
              variant="ghost"
              className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8 mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {pageData.title}
            </h1>

            <form onSubmit={profileFormik.handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {pageData.profile_section.title}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-gray-200 dark:border-gray-700">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} alt="Avatar" />
                      ) : null}
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                        {getInitials(profileFormik.values.name || author?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="avatar" className="flex items-center gap-2 cursor-pointer">
                        <ImageIcon className="w-4 h-4" />
                        {pageData.profile_section.avatar_label}
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleAvatarChange}
                        className="mt-2"
                      />
                      {avatarFile && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {avatarFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="name">{pageData.profile_section.name_label} *</Label>
                    <Input
                      id="name"
                      type="text"
                      {...profileFormik.getFieldProps("name")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                    {profileFormik.touched.name && profileFormik.errors.name && (
                      <p className="text-red-500 text-sm">{profileFormik.errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bio" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {pageData.profile_section.bio_label}
                    </Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      {...profileFormik.getFieldProps("bio")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Tell us about yourself..."
                    />
                    {profileFormik.touched.bio && profileFormik.errors.bio && (
                      <p className="text-red-500 text-sm">{profileFormik.errors.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {saving ? (
                    <>
                      <Spinner className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    pageData.save_button
                  )}
                </Button>
                <Link href={`/digi-share/profile/${user.authorId}`}>
                  <Button type="button" variant="outline">
                    {pageData.cancel_button}
                  </Button>
                </Link>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 md:p-8"
          >
            <form onSubmit={credentialsFormik.handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {pageData.credentials_section.title}
                </h2>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {pageData.credentials_section.email_label}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...credentialsFormik.getFieldProps("email")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      disabled
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Email changes require verification
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="currentPassword">
                      {pageData.credentials_section.current_password_label}
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      {...credentialsFormik.getFieldProps("currentPassword")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Leave empty if not changing password"
                    />
                    {credentialsFormik.touched.currentPassword && credentialsFormik.errors.currentPassword && (
                      <p className="text-red-500 text-sm">{credentialsFormik.errors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="newPassword">
                      {pageData.credentials_section.new_password_label}
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      {...credentialsFormik.getFieldProps("newPassword")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Leave empty if not changing password"
                    />
                    {credentialsFormik.touched.newPassword && credentialsFormik.errors.newPassword && (
                      <p className="text-red-500 text-sm">{credentialsFormik.errors.newPassword}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword">
                      {pageData.credentials_section.confirm_password_label}
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...credentialsFormik.getFieldProps("confirmPassword")}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Confirm new password"
                    />
                    {credentialsFormik.touched.confirmPassword && credentialsFormik.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{credentialsFormik.errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {saving ? (
                    <>
                      <Spinner className="mr-2" />
                      Saving...
                    </>
                  ) : (
                    pageData.save_button
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

export default ProfileSettingsPage;

