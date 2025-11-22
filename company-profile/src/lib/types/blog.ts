export type Blog = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  author_id: string;
  author_name?: string;
  category_id?: string;
  is_featured: boolean;
  category: Category;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
};
