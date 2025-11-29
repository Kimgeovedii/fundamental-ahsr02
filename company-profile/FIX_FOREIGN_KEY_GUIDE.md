# Panduan Fix Foreign Key Constraint untuk Tabel Blogs

## Masalah

Error yang terjadi:
```
insert or update on table "blogs" violates foreign key constraint "blogs_author_id_fkey"
Key (author_id)=(...) is not present in table "users".
```

**Penyebab**: Foreign key constraint di tabel `blogs` untuk kolom `author_id` masih mengarah ke tabel `users`, padahal seharusnya mengarah ke tabel `author`.

## Solusi

### Langkah 1: Buka Supabase Dashboard

1. Login ke Supabase Dashboard
2. Pilih project Anda
3. Pergi ke **SQL Editor**

### Langkah 2: Jalankan SQL Fix

Copy semua isi dari file `fix-blogs-foreign-key.sql` dan jalankan di SQL Editor.

**Atau jalankan manual:**

```sql
-- 1. Drop constraint lama
ALTER TABLE IF EXISTS "public"."blogs" 
DROP CONSTRAINT IF EXISTS "blogs_author_id_fkey";

-- 2. Buat constraint baru yang benar
ALTER TABLE "public"."blogs"
ADD CONSTRAINT "blogs_author_id_fkey" 
FOREIGN KEY ("author_id") 
REFERENCES "public"."author"("id") 
ON DELETE CASCADE
ON UPDATE CASCADE;

-- 3. Buat index untuk performa
CREATE INDEX IF NOT EXISTS "idx_blogs_author_id" ON "public"."blogs"("author_id");
```

### Langkah 3: Verifikasi

Setelah menjalankan SQL, cek dengan:

```sql
-- Cek constraint yang ada
SELECT 
  conname AS constraint_name,
  conrelid::regclass AS table_name,
  confrelid::regclass AS referenced_table
FROM pg_constraint
WHERE conrelid = 'blogs'::regclass
AND contype = 'f'
AND conname = 'blogs_author_id_fkey';
```

Hasil yang diharapkan:
- `constraint_name`: `blogs_author_id_fkey`
- `table_name`: `blogs`
- `referenced_table`: `author` ✅ (bukan `users`)

## Struktur Database yang Benar

```
blogs
├── id (PK)
├── author_id (FK) ────┐
├── title              │
├── description        │
├── image_url          │
└── ...                │
                       │
author                 │
├── id (PK) ◄──────────┘
├── user_id (FK) ────┐
├── name             │
├── avatar           │
└── bio              │
                     │
auth.users           │
└── id (PK) ◄────────┘
```

## Catatan

- `ON DELETE CASCADE`: Jika author dihapus, semua blog-nya juga akan dihapus
- `ON UPDATE CASCADE`: Jika author.id berubah, blogs.author_id akan ikut terupdate
- Pastikan semua data di `blogs.author_id` sudah valid (ada di tabel `author`)

## Troubleshooting

Jika masih error setelah fix:

1. **Cek apakah semua author_id di blogs valid:**
```sql
SELECT b.id, b.author_id 
FROM blogs b 
LEFT JOIN author a ON b.author_id = a.id 
WHERE a.id IS NULL;
```

2. **Jika ada data invalid, update atau hapus:**
```sql
-- Hapus blog dengan author_id yang tidak valid
DELETE FROM blogs 
WHERE author_id NOT IN (SELECT id FROM author);
```

3. **Pastikan tabel author ada:**
```sql
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'author';
```

