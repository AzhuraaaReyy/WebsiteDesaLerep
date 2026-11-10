-- Seed referensi (boleh dijalankan di dev maupun production).
-- Idempotent: aman dijalankan berulang kali.
-- docs/SCHEMA.md A.2: seed awal hanya role `admin`.

INSERT INTO roles (name, description)
VALUES ('admin', 'Administrator website dengan cakupan pengelolaan seluruh modul')
ON CONFLICT (name) DO NOTHING;
