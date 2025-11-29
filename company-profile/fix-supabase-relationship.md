# Fix Supabase Multiple Relationship Error

## Problem
Error: "Could not embed because more than one relationship was found for 'blogs' and 'author'"

## Solution Applied
Updated all queries in `blogService.ts` to use specific relationship name:
- Changed `author:author(...)` to `author!blogs_author_id_fkey(...)`

## If Still Error

If the error persists, try one of these:

### Option 1: Use the alternative constraint name
Change `author!blogs_author_id_fkey` to `author!blogs_author_id_fkey1`

### Option 2: Remove duplicate foreign key constraints
Check your database and remove duplicate foreign key constraints:

```sql
-- Check existing constraints
SELECT 
  conname AS constraint_name,
  conrelid::regclass AS table_name,
  confrelid::regclass AS referenced_table
FROM pg_constraint
WHERE conrelid = 'blogs'::regclass
AND contype = 'f'
AND conname LIKE '%author%';

-- Drop duplicate constraint (keep only blogs_author_id_fkey)
ALTER TABLE "public"."blogs" 
DROP CONSTRAINT IF EXISTS "blogs_author_id_fkey1";
```

### Option 3: Fetch author separately (fallback)
If relationship name doesn't work, fetch author data separately:

```typescript
async getByAuthorId(authorId: string): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false});
  if (error) throw error;
  
  // Fetch authors separately
  const authorIds = [...new Set(data.map(b => b.author_id))];
  const { data: authors } = await supabase
    .from("author")
    .select("id, name, avatar, bio")
    .in("id", authorIds);
  
  const authorMap = new Map(authors?.map(a => [a.id, a]) || []);
  
  return data.map((blog: any) => ({
    ...blog,
    author: authorMap.get(blog.author_id),
    author_name: authorMap.get(blog.author_id)?.name || null,
    author_id: blog.author_id,
  }));
}
```

