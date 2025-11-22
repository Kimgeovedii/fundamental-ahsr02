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
import { toast } from "sonner";
import { useBlogs } from "@/lib/hooks";

const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title wajib diisi"),
  content: Yup.string().required("Content wajib diisi"),
  category: Yup.string().required("Category wajib dipilih"),
});

export const BlogForm: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const { user } = useAuthStore();
  const { categories, fetchCategory } = useCategoryStore();
  const { fetchBlogs } = useBlogs();

  const [imageFile, setImageFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const handleImageUpload = async () => {
    if (!imageFile) return "";

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
  };

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        category: "",
        featured: false,
      }}
      validationSchema={BlogSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          if (!user) return toast.error("User tidak ditemukan");

          const imageUrl = await handleImageUpload();

          await blogService.create({
            title: values.title,
            description: values.content,
            image_url: imageUrl,
            category_id: values.category,
            is_featured: values.featured,
            author_id: user.id,
            created_at: new Date().toISOString(),
          });

          toast.success("Blog berhasil dibuat!");

          resetForm();
          setImageFile(null);

          await fetchBlogs();

          if (onSuccess) onSuccess();
        } catch (err: any) {
          toast.error(err.message || "Gagal membuat blog");
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
              <Label>Image *</Label>
              <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                required
              />

              {imageFile && (
                <p className="text-sm text-gray-600">{imageFile.name}</p>
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
            {isSubmitting ? "Submitting..." : "Create Blog"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
