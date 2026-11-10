-- Domain A: Identity, Users & Authorization (SCHEMA.md 5.A)
-- auth.users disediakan oleh Supabase Auth.

-- A.2
CREATE TABLE roles (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(50)  NOT NULL,
    description TEXT,
    is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT uq_roles_name UNIQUE (name),
    CONSTRAINT chk_roles_name_format CHECK (name ~ '^[a-z][a-z0-9_]*$')
);

-- A.1
CREATE TABLE user_profiles (
    id          UUID         PRIMARY KEY,
    full_name   VARCHAR(150),
    avatar_path TEXT,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT fk_user_profiles_auth_user
        FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- A.3
CREATE TABLE user_roles (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL,
    role_id    UUID        NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_user_roles_user_role UNIQUE (user_id, role_id),
    CONSTRAINT fk_user_roles_auth_user
        FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT
);

CREATE INDEX idx_user_roles_role_id ON user_roles (role_id);

-- RLS baseline evaluasi (SCHEMA.md 9.3, AR-12)
ALTER TABLE roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles    ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        REVOKE ALL ON roles, user_profiles, user_roles FROM anon, authenticated;
    END IF;
END
$$;

-- Role, akun admin, dan penugasan role dibuat manual/seed (ARCH 7.1, 8.8);
-- runtime hanya membaca. Profil aplikasi dikelola oleh API.
GRANT SELECT                 ON roles         TO app_runtime;
GRANT SELECT                 ON user_roles    TO app_runtime;
GRANT SELECT, INSERT, UPDATE ON user_profiles TO app_runtime;

CREATE POLICY app_runtime_all ON roles         FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON user_profiles FOR ALL TO app_runtime USING (true) WITH CHECK (true);
CREATE POLICY app_runtime_all ON user_roles    FOR ALL TO app_runtime USING (true) WITH CHECK (true);
