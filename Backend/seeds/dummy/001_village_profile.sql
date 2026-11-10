-- DATA DUMMY untuk development. JANGAN dijalankan di production.
-- Nama desa/kecamatan/kabupaten/provinsi asli; sisanya contoh dan wajib
-- diganti dengan data resmi dari desa sebelum dipakai.
-- Idempotent: memakai UUID tetap + ON CONFLICT.

-- Profil desa (singleton)
INSERT INTO village_profiles (
    id, village_name, village_code, district_name, regency_name, province_name,
    postal_code, address, phone, email, office_hours, website_url,
    history, vision, mission
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Lerep',
    NULL,
    'Ungaran Barat',
    'Kabupaten Semarang',
    'Jawa Tengah',
    NULL, -- kode pos: isi dari data resmi
    '[DUMMY] Jl. Contoh No. 1, Desa Lerep',
    '[DUMMY] 024-0000000',
    'dummy@example.com',
    '{
        "senin":  {"buka": "08:00", "tutup": "15:00"},
        "selasa": {"buka": "08:00", "tutup": "15:00"},
        "rabu":   {"buka": "08:00", "tutup": "15:00"},
        "kamis":  {"buka": "08:00", "tutup": "15:00"},
        "jumat":  {"buka": "08:00", "tutup": "11:00"},
        "sabtu":  null,
        "minggu": null
    }'::jsonb,
    NULL,
    '[DUMMY] Sejarah singkat Desa Lerep. Teks ini hanya contoh untuk pengembangan tampilan halaman profil desa.',
    '[DUMMY] Terwujudnya Desa Lerep yang maju, mandiri, dan sejahtera.',
    E'[DUMMY]\n1. Meningkatkan kualitas pelayanan publik.\n2. Mengembangkan potensi desa dan UMKM.\n3. Mewujudkan tata kelola desa yang transparan.'
)
ON CONFLICT (id) DO NOTHING;

-- Dusun (kepala dusun diisi setelah perangkat desa dibuat)
INSERT INTO hamlets (id, name, description, latitude, longitude) VALUES
    ('00000000-0000-0000-0000-000000000101', 'Dusun Contoh Satu', '[DUMMY] Deskripsi dusun contoh.', -7.1300000, 110.3700000),
    ('00000000-0000-0000-0000-000000000102', 'Dusun Contoh Dua',  '[DUMMY] Deskripsi dusun contoh.', -7.1350000, 110.3750000),
    ('00000000-0000-0000-0000-000000000103', 'Dusun Contoh Tiga', '[DUMMY] Deskripsi dusun contoh.', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Perangkat desa (struktur organisasi lewat parent_official_id)
INSERT INTO village_officials (id, hamlet_id, full_name, position, duties, parent_official_id, sort_order) VALUES
    ('00000000-0000-0000-0000-000000000201', NULL, '[DUMMY] Budi Santoso',   'Kepala Desa',                '[DUMMY] Memimpin penyelenggaraan pemerintahan desa.', NULL, 1),
    ('00000000-0000-0000-0000-000000000202', NULL, '[DUMMY] Siti Aminah',    'Sekretaris Desa',            '[DUMMY] Membantu kepala desa di bidang administrasi.', '00000000-0000-0000-0000-000000000201', 2),
    ('00000000-0000-0000-0000-000000000203', NULL, '[DUMMY] Agus Prasetyo',  'Kepala Urusan Keuangan',     '[DUMMY] Mengelola administrasi keuangan desa.',        '00000000-0000-0000-0000-000000000202', 3),
    ('00000000-0000-0000-0000-000000000204', NULL, '[DUMMY] Dewi Lestari',   'Kepala Seksi Pelayanan',     '[DUMMY] Melaksanakan pelayanan kepada masyarakat.',    '00000000-0000-0000-0000-000000000201', 4),
    ('00000000-0000-0000-0000-000000000211', '00000000-0000-0000-0000-000000000101', '[DUMMY] Wahyu Hidayat', 'Kepala Dusun', '[DUMMY] Memimpin wilayah Dusun Contoh Satu.', '00000000-0000-0000-0000-000000000201', 10),
    ('00000000-0000-0000-0000-000000000212', '00000000-0000-0000-0000-000000000102', '[DUMMY] Rina Marlina',        'Kepala Dusun', '[DUMMY] Memimpin wilayah Dusun Contoh Dua.',  '00000000-0000-0000-0000-000000000201', 11),
    ('00000000-0000-0000-0000-000000000213', '00000000-0000-0000-0000-000000000103', '[DUMMY] Slamet Riyadi',       'Kepala Dusun', '[DUMMY] Memimpin wilayah Dusun Contoh Tiga.', '00000000-0000-0000-0000-000000000201', 12)
ON CONFLICT (id) DO NOTHING;

-- Hubungkan kepala dusun ke dusunnya
UPDATE hamlets AS h
SET head_of_hamlet_official_id = v.official_id,
    updated_at = now()
FROM (VALUES
    ('00000000-0000-0000-0000-000000000101'::uuid, '00000000-0000-0000-0000-000000000211'::uuid),
    ('00000000-0000-0000-0000-000000000102'::uuid, '00000000-0000-0000-0000-000000000212'::uuid),
    ('00000000-0000-0000-0000-000000000103'::uuid, '00000000-0000-0000-0000-000000000213'::uuid)
) AS v(hamlet_id, official_id)
WHERE h.id = v.hamlet_id
  AND h.head_of_hamlet_official_id IS DISTINCT FROM v.official_id;
