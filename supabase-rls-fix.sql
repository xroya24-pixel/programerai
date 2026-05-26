-- 1. Hapus policies yang menyebabkan infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- 2. Tambah kolom slug di tabel courses (tidak ada di migration awal)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;

-- 3. Tambah kolom sort_order di tabel courses untuk drag-and-drop reorder
ALTER TABLE courses ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- 4. Set initial sort_order based on created_at for existing courses
UPDATE courses SET sort_order = sub.rn FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 AS rn FROM courses
) sub WHERE courses.id = sub.id;
