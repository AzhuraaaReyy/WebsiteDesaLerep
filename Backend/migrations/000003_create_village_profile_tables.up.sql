-- Domain B tahap 1 & 2: Village Profile & Institutions
-- (SCHEMA.md 5.B, 6.1, 6.2, 7, 11 langkah 3-4)
-- B.7 village_institution_programs, B.8 village_institution_activities, dan
-- B.9 village_institution_activity_media DITUNDA (SCHEMA.md B.9) dan tidak
-- dibuat pada migration awal.

-- ---------------------------------------------------------------------------
-- Tahap 1
-- ---------------------------------------------------------------------------

-- B.1 Profil desa (singleton, SCHEMA.md 6.2)
CREATE TABLE village_profiles (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    singleton_key BOOLEAN      NOT NULL DEFAULT TRUE,
    village_name  VARCHAR(150) NOT NULL,
    village_code  VARCHAR(30),
    district_name VARCHAR(150) NOT NULL,
    regency_name  VARCHAR(150) NOT NULL,
    province_name VARCHAR(150) NOT NULL,
    postal_code   VARCHAR(10),
    address       TEXT,
    phone         VARCHAR(30),
    email         VARCHAR(255),
    office_hours  JSONB,
    website_url   TEXT,
    history       TEXT,
    vision        TEXT,
    mission       TEXT,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_village_profiles_singleton_key UNIQUE (singleton_key),
    CONSTRAINT chk_village_profiles_singleton_key CHECK (singleton_key IS TRUE)
);

-- B.2 Riwayat versi profil desa
CREATE TABLE village_profile_versions (
    id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    village_profile_id UUID        NOT NULL,
    version_number     INTEGER     NOT NULL,
    snapshot           JSONB       NOT NULL,
    change_summary     TEXT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_village_profile_versions_profile_version
        UNIQUE (village_profile_id, version_number),
    CONSTRAINT chk_village_profile_versions_version_number CHECK (version_number > 0),
    CONSTRAINT chk_village_profile_versions_snapshot_object
        CHECK (jsonb_typeof(snapshot) = 'object'),
    CONSTRAINT fk_village_profile_versions_village_profile
        FOREIGN KEY (village_profile_id) REFERENCES village_profiles (id) ON DELETE RESTRICT
);

CREATE INDEX idx_village_profile_versions_profile_version_desc
    ON village_profile_versions (village_profile_id, version_number DESC);

-- B.4 Dusun (FK kepala dusun ditambahkan setelah village_officials dibuat)
CREATE TABLE hamlets (
    id                         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    name                       VARCHAR(100)  NOT NULL,
    description                TEXT,
    address                    TEXT,
    latitude                   NUMERIC(10,7),
    longitude                  NUMERIC(10,7),
    head_of_hamlet_official_id UUID,
    photo_path                 TEXT,
    is_active                  BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at                 TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at                 TIMESTAMPTZ   NOT NULL DEFAULT now(),
    CONSTRAINT chk_hamlets_coordinates_pair
        CHECK ((latitude IS NULL) = (longitude IS NULL)),
    CONSTRAINT chk_hamlets_latitude_range  CHECK (latitude  BETWEEN -90  AND 90),
    CONSTRAINT chk_hamlets_longitude_range CHECK (longitude BETWEEN -180 AND 180)
);

-- Nama unik setelah normalisasi (V-03): huruf kecil + tanpa spasi tepi
CREATE UNIQUE INDEX uq_hamlets_name ON hamlets (lower(btrim(name)));

-- B.5 Lembaga desa
CREATE TABLE village_institutions (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(150) NOT NULL,
    description TEXT,
    logo_path   TEXT,
    contact     VARCHAR(100),
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX uq_village_institutions_name ON village_institutions (lower(btrim(name)));

-- ---------------------------------------------------------------------------
-- Tahap 2
-- ---------------------------------------------------------------------------

-- B.3 Perangkat desa
CREATE TABLE village_officials (
    id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    hamlet_id          UUID,
    full_name          VARCHAR(150) NOT NULL,
    position           VARCHAR(100) NOT NULL,
    duties             TEXT,
    public_contact     VARCHAR(100),
    parent_official_id UUID,
    sort_order         INTEGER      NOT NULL DEFAULT 0,
    photo_path         TEXT,
    term_start_date    DATE,
    term_end_date      DATE,
    is_active          BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_village_officials_id_hamlet UNIQUE (id, hamlet_id),
    CONSTRAINT chk_village_officials_sort_order CHECK (sort_order >= 0),
    CONSTRAINT chk_village_officials_term_range
        CHECK (term_start_date IS NULL OR term_end_date IS NULL OR term_end_date >= term_start_date),
    CONSTRAINT chk_village_officials_not_self_parent
        CHECK (parent_official_id IS NULL OR parent_official_id <> id),
    CONSTRAINT fk_village_officials_hamlet
        FOREIGN KEY (hamlet_id) REFERENCES hamlets (id) ON DELETE RESTRICT,
    CONSTRAINT fk_village_officials_parent_official
        FOREIGN KEY (parent_official_id) REFERENCES village_officials (id) ON DELETE SET NULL
);

CREATE INDEX idx_village_officials_hamlet_id          ON village_officials (hamlet_id);
CREATE INDEX idx_village_officials_parent_official_id ON village_officials (parent_official_id);

-- B.6 Anggota/pengurus lembaga desa
CREATE TABLE village_institution_members (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id  UUID         NOT NULL,
    full_name       VARCHAR(150) NOT NULL,
    position        VARCHAR(100) NOT NULL,
    contact         VARCHAR(100),
    photo_path      TEXT,
    term_start_date DATE,
    term_end_date   DATE,
    sort_order      INTEGER      NOT NULL DEFAULT 0,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_by      UUID,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_village_institution_members_sort_order CHECK (sort_order >= 0),
    CONSTRAINT chk_village_institution_members_term_range
        CHECK (term_start_date IS NULL OR term_end_date IS NULL OR term_end_date >= term_start_date),
    CONSTRAINT fk_village_institution_members_institution
        FOREIGN KEY (institution_id) REFERENCES village_institutions (id) ON DELETE RESTRICT,
    CONSTRAINT fk_village_institution_members_created_by
        FOREIGN KEY (created_by) REFERENCES auth.users (id) ON DELETE SET NULL
);

CREATE INDEX idx_village_institution_members_institution_term
    ON village_institution_members (institution_id, term_start_date);

-- 6.1 Kepala dusun harus pejabat dari dusun yang sama (composite FK)
ALTER TABLE hamlets
    ADD CONSTRAINT fk_hamlets_head_of_hamlet_official
        FOREIGN KEY (head_of_hamlet_official_id, id)
        REFERENCES village_officials (id, hamlet_id)
        ON DELETE RESTRICT;

-- ---------------------------------------------------------------------------
-- RLS baseline evaluasi (SCHEMA.md 9.3, AR-12)
-- ---------------------------------------------------------------------------
ALTER TABLE village_profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_profile_versions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE hamlets                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_institutions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_officials           ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_institution_members ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        REVOKE ALL ON village_profiles, village_profile_versions, hamlets,
                      village_institutions, village_officials, village_institution_members
            FROM anon, authenticated;
    END IF;
END
$$;

-- Tanpa DELETE: data dinonaktifkan (is_active), bukan dihapus (SCHEMA.md B.3).
-- Snapshot versi immutable: hanya SELECT + INSERT (SCHEMA.md B.2).
GRANT SELECT, INSERT, UPDATE ON village_profiles            TO app_runtime;
GRANT SELECT, INSERT         ON village_profile_versions    TO app_runtime;
GRANT SELECT, INSERT, UPDATE ON hamlets                     TO app_runtime;
GRANT SELECT, INSERT, UPDATE ON village_institutions        TO app_runtime;
GRANT SELECT, INSERT, UPDATE ON village_officials           TO app_runtime;
GRANT SELECT, INSERT, UPDATE ON village_institution_members TO app_runtime;

CREATE POLICY app_runtime_all ON village_profiles            FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON village_profile_versions    FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON hamlets                     FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON village_institutions        FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON village_officials           FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON village_institution_members FOR ALL TO app_runtime USING (true) WITH CHECK (true);
