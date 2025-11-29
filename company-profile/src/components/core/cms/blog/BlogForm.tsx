"use client";

import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuthStore, useCategoryStore } from "@/lib/stores";
import { supabase } from "@/lib/supabase/client";
import { blogService } from "@/lib/services";
import { authorService } from "@/lib/services/authorService";
import { toast } from "sonner";
import { useBlogs } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title wajib diisi"),
  content: Yup.string().required("Content wajib diisi"),
  category: Yup.string().required("Category wajib dipilih"),
});

interface BlogFormProps {
  onSuccess?: () => void;
  blogId?: string;
  initialBlog?: {
    title: string;
    description: string;
    image_url: string;
    category_id: string;
    is_featured: boolean;
  };
}

export const BlogForm: React.FC<BlogFormProps> = ({
  onSuccess,
  blogId,
  initialBlog,
}) => {
  const { user } = useAuthStore();
  const { categories, fetchCategory } = useCategoryStore();
  const { fetchBlogs } = useBlogs();
  const [loading, setLoading] = React.useState(!!blogId && !initialBlog);

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = React.useState<string>(
    initialBlog?.image_url || ""
  );

  const isEditMode = !!blogId;

  React.useEffect(() => {
    fetchCategory();
    if (blogId && !initialBlog) {
      loadBlogData();
    }
  }, [blogId]);

  React.useEffect(() => {
    if (initialBlog?.image_url) {
      setCurrentImageUrl(initialBlog.image_url);
    }
  }, [initialBlog?.image_url]);

  const loadBlogData = async () => {
    if (!blogId) return;
    try {
      const blog = await blogService.getById(blogId);
      if (blog) {
        setCurrentImageUrl(blog.image_url || "");
      }
    } catch (error) {
      toast.error("Failed to load blog data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, imageFile);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(data.path);

      return publicData.publicUrl;
    }
    return currentImageUrl;
  };

  const initialValues = {
    title: initialBlog?.title || "",
    content: initialBlog?.description || "",
    category: initialBlog?.category_id || "",
    featured: initialBlog?.is_featured || false,
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BlogSchema}
      enableReinitialize={isEditMode}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          if (!user) return toast.error("User tidak ditemukan");
          if (!user.authorId) return toast.error("Author profile tidak ditemukan. Silakan lengkapi profil Anda.");

          const author = await authorService.getById(user.authorId);
          if (!author || !author.name) {
            toast.error("Silakan lengkapi nama Anda di Profile Settings terlebih dahulu sebelum membuat postingan.");
            return;
          }

          const imageUrl = await handleImageUpload();

          if (isEditMode && blogId) {
            await blogService.update(blogId, {
              title: values.title,
              description: values.content,
              image_url: imageUrl,
              category_id: values.category,
              is_featured: values.featured,
            });

            toast.success("Blog berhasil diupdate!");
          } else {
            await blogService.create({
              title: values.title,
              description: values.content,
              image_url: imageUrl,
              category_id: values.category,
              is_featured: values.featured,
              author_id: user.authorId,
              created_at: new Date().toISOString(),
            });

            toast.success("Blog berhasil dibuat!");
            resetForm();
            setImageFile(null);
          }

          await fetchBlogs();

          if (onSuccess) onSuccess();
        } catch (err: any) {
          toast.error(err.message || (isEditMode ? "Gagal mengupdate blog" : "Gagal membuat blog"));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label>Article Title *</Label>
              <Field name="title">
                {({ field }: any) => (
                  <Input {...field} placeholder="Enter article title" />
                )}
              </Field>
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Image {!isEditMode ? "*" : ""}</Label>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                required={!isEditMode}
              />

              {imageFile && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{imageFile.name}</p>
              )}

              {currentImageUrl && !imageFile && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current image:</p>
                  <img
                    src={currentImageUrl}
                    alt="Current"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Article Content *</Label>
            <Field name="content">
              {({ field }: any) => (
                <Textarea
                  {...field}
                  className="min-h-[200px]"
                  placeholder="Write here..."
                />
              )}
            </Field>
            {errors.content && touched.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label>Category *</Label>

              <Select
                value={values.category}
                onValueChange={(v) => setFieldValue("category", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.category && touched.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Featured</Label>
              <div className="flex items-center gap-4">
                <Switch
                  checked={values.featured}
                  onCheckedChange={(v) => setFieldValue("featured", v)}
                />
                <p>⭐ Feature this article</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
              ? "Update Blog"
              : "Create Blog"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
