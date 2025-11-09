"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBlogStore } from "@/lib/blogStore";
import { useAuthStore } from "@/lib/authStore";

interface BlogStore {
  title: string;
  description: string;
}

const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(20, "Title minimal 20 Karakter")
    .required("Title wajib diisi."),
  description: Yup.string()
    .min(20, "Description minimal 20 karakter.")
    .required("Description wajib diisi."),
});

const BlogDrawerUi = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { userToken } = useAuthStore();
  const { fetchBlogs, createBlog } = useBlogStore();

  const formik = useFormik<BlogStore>({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: BlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      if (!userToken) {
        toast.error("Error: Sesi tidak valid. Mohon login ulang.");
        setSubmitting(false);
        return;
      }

      const result = await createBlog(
        values.title,
        values.description,
        userToken
      );

      setSubmitting(false);

      if (result.success) {
        await fetchBlogs(userToken);
        toast.success(result.message || "Blog berhasil ditambahkan!");
        resetForm();
        setIsOpen(false);
      } else {
        toast.error(
          result.message || "Gagal membuat blog. Mohon periksa koneksi Anda."
        );
      }
    },
  });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Buat Blog Baru</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Buat Blog Baru</DrawerTitle>
            <DrawerDescription>Tulis ide dan cerita Anda.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 p-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Input Title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="description"
                  name="description"
                  placeholder="Input deskripsi blog..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>
            </div>

            <DrawerFooter className="p-4 pt-0">
              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Menyimpan..." : "Submit Blog"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BlogDrawerUi;
