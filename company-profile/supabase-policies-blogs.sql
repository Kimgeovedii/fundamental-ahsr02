-- Policy untuk tabel blogs
-- Struktur: blogs.author_id -> author.id, author.user_id -> auth.users.id

-- 1. DROP policy lama jika ada
DROP POLICY IF EXISTS "Users insert their own blogs" ON "public"."blogs";
DROP POLICY IF EXISTS "Users can view all blogs" ON "public"."blogs";
DROP POLICY IF EXISTS "Users can update their own blogs" ON "public"."blogs";
DROP POLICY IF EXISTS "Users can delete their own blogs" ON "public"."blogs";

-- 2. Policy SELECT - Semua user bisa melihat semua blogs (public)
CREATE POLICY "Users can view all blogs"
ON "public"."blogs"
FOR SELECT
TO public
USING (true);

-- 3. Policy INSERT - User hanya bisa insert blog dengan author_id milik mereka
CREATE POLICY "Users insert their own blogs"
ON "public"."blogs"
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM "public"."author"
    WHERE "author"."id" = "blogs"."author_id"
    AND "author"."user_id" = auth.uid()
  )
);

-- 4. Policy UPDATE - User hanya bisa update blog mereka sendiri
CREATE POLICY "Users can update their own blogs"
ON "public"."blogs"
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM "public"."author"
    WHERE "author"."id" = "blogs"."author_id"
    AND "author"."user_id" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM "public"."author"
    WHERE "author"."id" = "blogs"."author_id"
    AND "author"."user_id" = auth.uid()
  )
);

-- 5. Policy DELETE - User hanya bisa delete blog mereka sendiri
CREATE POLICY "Users can delete their own blogs"
ON "public"."blogs"
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM "public"."author"
    WHERE "author"."id" = "blogs"."author_id"
    AND "author"."user_id" = auth.uid()
  )
);

