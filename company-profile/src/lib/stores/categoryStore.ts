import { create } from "zustand";
import { categoryService } from "../services";
import { Category } from "../types";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategory: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,

  fetchCategory: async () => {
    set({ loading: true });
    const data = await categoryService.getAll();
    set({ categories: data, loading: false });
  },
}));
