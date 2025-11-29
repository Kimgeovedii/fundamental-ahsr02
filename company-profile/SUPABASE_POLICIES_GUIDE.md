# Panduan Update Policy Tabel Blogs di Supabase

## Struktur Database Baru

- `blogs.author_id` → FK ke `author.id`
- `author.user_id` → FK ke `auth.users.id`

## Policy yang Perlu Diupdate

### 1. Buka Supabase Dashboard

1. Login ke Supabase Dashboard
2. Pilih project Anda
3. Pergi ke **Authentication** → **Policies** atau **Table Editor** → pilih tabel `blogs` → klik tab **Policies**

### 2. Update Policy INSERT

**Policy Name:** `Users insert their own blogs`

**Table:** `public.blogs`

**Policy Behavior:** Permissive

**Policy Command:** INSERT

**Target Roles:** authenticated

**WITH CHECK clause:**
```sql
EXISTS (
  SELECT 1 
  FROM "public"."author"
  WHERE "author"."id" = "blogs"."author_id"
  AND "author"."user_id" = auth.uid()
)
```

**Penjelasan:** User hanya bisa insert blog dengan `author_id` yang merupakan author milik mereka sendiri (author.user_id = auth.uid()).

### 3. Update/Create Policy SELECT (Jika diperlukan)

**Policy Name:** `Users can view all blogs`

**Table:** `public.blogs`

**Policy Behavior:** Permissive

**Policy Command:** SELECT

**Target Roles:** public (atau authenticated, tergantung kebutuhan)

**USING clause:**
```sql
true
```

**Penjelasan:** Semua user (atau authenticated user) bisa melihat semua blogs.

### 4. Update/Create Policy UPDATE (Jika diperlukan)

**Policy Name:** `Users can update their own blogs`

**Table:** `public.blogs`

**Policy Behavior:** Permissive

**Policy Command:** UPDATE

**Target Roles:** authenticated

**USING clause:**
```sql
EXISTS (
  SELECT 1 
  FROM "public"."author"
  WHERE "author"."id" = "blogs"."author_id"
  AND "author"."user_id" = auth.uid()
)
```

**WITH CHECK clause:**
```sql
EXISTS (
  SELECT 1 
  FROM "public"."author"
  WHERE "author"."id" = "blogs"."author_id"
  AND "author"."user_id" = auth.uid()
)
```

**Penjelasan:** User hanya bisa update blog yang author_id-nya adalah author milik mereka.

### 5. Update/Create Policy DELETE (Jika diperlukan)

**Policy Name:** `Users can delete their own blogs`

**Table:** `public.blogs`

**Policy Behavior:** Permissive

**Policy Command:** DELETE

**Target Roles:** authenticated

**USING clause:**
```sql
EXISTS (
  SELECT 1 
  FROM "public"."author"
  WHERE "author"."id" = "blogs"."author_id"
  AND "author"."user_id" = auth.uid()
)
```

**Penjelasan:** User hanya bisa delete blog yang author_id-nya adalah author milik mereka.

## Alternatif: Menggunakan SQL Editor

Jika Anda lebih suka menggunakan SQL Editor di Supabase:

1. Buka **SQL Editor** di Supabase Dashboard
2. Copy paste SQL dari file `supabase-policies-blogs.sql`
3. Jalankan query tersebut

## Catatan Penting

- Pastikan foreign key constraint di tabel `author` sudah benar mengarah ke `auth.users.id`
- Policy akan langsung aktif setelah diupdate
- Test dengan user yang berbeda untuk memastikan policy bekerja dengan benar

