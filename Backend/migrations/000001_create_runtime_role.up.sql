-- Fondasi akses database (SCHEMA.md 9.3, ARCHITECTURE.md 11.7 / AR-12).
--
-- Role runtime khusus untuk Go API:
--   - LOGIN, NOBYPASSRLS, bukan owner tabel.
--   - Privilege tabel diberikan per migration domain sesuai kebutuhan.
--   - Password TIDAK disimpan di migration; diset manual secara terkontrol
--     (ALTER ROLE app_runtime WITH PASSWORD '...') oleh pemegang kredensial
--     migration. Lihat README bagian "Kredensial database".
--
-- Kredensial migration/owner (postgres) terpisah dan tidak dipakai runtime.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_runtime') THEN
        CREATE ROLE app_runtime LOGIN NOBYPASSRLS NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
    END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO app_runtime;

-- Tabel internal golang-migrate tidak boleh diakses Data API maupun runtime.
DO $$
BEGIN
    IF to_regclass('public.schema_migrations') IS NOT NULL THEN
        ALTER TABLE public.schema_migrations ENABLE ROW LEVEL SECURITY;
        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
            REVOKE ALL ON public.schema_migrations FROM anon, authenticated;
        END IF;
    END IF;
END
$$;
