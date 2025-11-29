-- Fix Foreign Key Constraint untuk tabel blogs
-- Problem: blogs.author_id masih mengarah ke users, seharusnya ke author

-- 1. Cek constraint yang ada (untuk referensi)
-- SELECT 
--   conname AS constraint_name,
--   conrelid::regclass AS table_name,
--   confrelid::regclass AS referenced_table
-- FROM pg_constraint
-- WHERE conrelid = 'blogs'::regclass
-- AND contype = 'f';

-- 2. Drop constraint lama yang salah (jika ada)
ALTER TABLE IF EXISTS "public"."blogs" 
DROP CONSTRAINT IF EXISTS "blogs_author_id_fkey";

-- 3. Buat constraint baru yang benar (author_id -> author.id)
ALTER TABLE "public"."blogs"
ADD CONSTRAINT "blogs_author_id_fkey" 
FOREIGN KEY ("author_id") 
REFERENCES "public"."author"("id") 
ON DELETE CASCADE
ON UPDATE CASCADE;

-- 4. Pastikan index ada untuk performa
CREATE INDEX IF NOT EXISTS "idx_blogs_author_id" ON "public"."blogs"("author_id");

