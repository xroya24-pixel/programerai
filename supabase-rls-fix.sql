-- 1. Hapus policies yang menyebabkan infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- 2. Tambah kolom slug di tabel courses (tidak ada di migration awal)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;
