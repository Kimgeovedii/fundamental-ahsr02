"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useBlogStore } from "@/lib/blogStore";
import { useAuthStore } from "@/lib/useAuthStore";
import { supabase } from "@/lib/supabaseClient";

export const BlogForm: React.FC = () => {
  const { user } = useAuthStore();
  const { insertBlog, loading } = useBlogStore();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("User not found");
    if (!title.trim() || !content.trim())
      return alert("Title and content required.");

    let imageUrl = "";

    if (imageFile) {
      try {
        setUploading(true);
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Fix: getPublicUrl tidak punya 'error'
        const { data: publicData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(uploadData.path);

        imageUrl = publicData.publicUrl;
      } catch (err: any) {
        setUploading(false);
        return alert("Gagal upload image: " + err.message);
      } finally {
        setUploading(false);
      }
    }

    const { success, error } = await insertBlog({
      title,
      description: content,
      image_url: imageUrl,
      author_id: user.id,
    });

    if (success) {
      alert("Blog berhasil dibuat!");
      setTitle("");
      setContent("");
      setImageFile(null);
    } else {
      alert("Gagal membuat blog: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-1">
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
        />
        {imageFile && <p>Selected: {imageFile.name}</p>}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your blog content"
          className="border rounded-md min-h-[300px]"
        />
      </div>

      <Button type="submit" disabled={loading || uploading}>
        {loading || uploading ? "Submitting..." : "Create Blog"}
      </Button>
    </form>
  );
};
