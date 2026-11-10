# Website Desa Lerep

Platform informasi dan pelayanan digital Desa Lerep, Kecamatan Ungaran Barat, Kabupaten Semarang, Jawa Tengah.

Proyek ini dikembangkan dengan strategi **Evaluation-First, Production-Ready Later**: memenuhi kebutuhan evaluasi website desa terlebih dahulu, tetapi tetap menggunakan struktur yang siap dikembangkan untuk operasional jangka panjang.

## Status

Saat ini repository berisi fondasi proyek:

- Frontend Next.js App Router dengan halaman awal.
- Backend Golang dengan health check dan API root `/api/v1`.
- Docker Compose untuk development dan production-style.
- Nginx sebagai reverse proxy.
- Dokumentasi produk dan arsitektur di `docs/`.

Modul bisnis, autentikasi, database schema final, dan migrasi belum diimplementasikan.

## Modul yang Direncanakan

1. Profil Desa
2. Statistik Desa
3. Transparansi Desa
4. Pelayanan Publik
5. Berita & Informasi
6. Potensi Desa
7. Agenda & Kegiatan
8. Fitur Inovasi

Prioritas fitur mengikuti `docs/PRD.md`, dengan P0 sebagai fokus utama.

## Teknologi

| Lapisan | Teknologi |
|---|---|
| Frontend | Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Golang, Gin, pgx/pgxpool |
| Database | Supabase PostgreSQL |
| Auth & Storage | Supabase Auth, Supabase Storage |
| Migration | golang-migrate |
| Reverse proxy | Nginx |
| Container | Docker, Docker Compose |
| Deployment | VPS, HTTPS |

Arsitektur lengkap ada di `docs/ARCHITECTURE.md`.

## Struktur Repository

```text
WebsiteDesaLerep/
├── Backend/                 # Golang API
│   ├── cmd/api/             # Entrypoint aplikasi
│   ├── internal/            # Config, database, router, shared code
│   ├── Dockerfile
│   └── .env.example
├── Frontend/                # Next.js App Router
│   ├── src/app/
│   ├── Dockerfile
│   └── .env.example
├── docs/                    # PRD, arsitektur, schema, desain
├── infra/nginx/             # Konfigurasi reverse proxy
├── docker-compose.yml       # Base/production
├── docker-compose.dev.yml   # Override development
└── .env.example             # Environment untuk Docker Compose
```

## Prasyarat

- Go 1.27.3 atau versi kompatibel dengan `Backend/go.mod`
- Node.js 24 dan npm
- Docker Desktop atau Docker Engine + Docker Compose
- Project Supabase, jika ingin mengaktifkan fitur database

## Menjalankan Backend Secara Lokal

Jalankan dari direktori `Backend/`.

### 1. Unduh dependency

```powershell
go mod download
```

### 2. Siapkan environment

Backend membaca environment variable langsung dari proses. File `Backend/.env` **tidak dimuat otomatis** oleh aplikasi Go saat ini, jadi export variabel di shell atau gunakan Docker Compose.

PowerShell:

```powershell
$env:PORT = "8080"
$env:DATABASE_URL = "postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require"
$env:SHUTDOWN_TIMEOUT = "10s"
```

Bash:

```bash
export PORT=8080
export DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require"
export SHUTDOWN_TIMEOUT=10s
```

Gunakan connection string dari Supabase Dashboard. Untuk koneksi `pgx` dari VPS, verifikasi opsi Supabase Pooler (port `6543` atau `5432`) dan URL-encode karakter khusus pada password.

`DATABASE_URL` boleh dikosongkan. Tanpa nilai tersebut, aplikasi tetap berjalan, tetapi fitur yang membutuhkan database dinonaktifkan dan health check akan menampilkan `database: not_configured`.

Saat ini backend baru membaca `PORT`, `DATABASE_URL`, dan `SHUTDOWN_TIMEOUT`. Variabel `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` disiapkan untuk modul berikutnya.

### 3. Jalankan API

```powershell
go run ./cmd/api
```

Default server berjalan di `http://localhost:8080`.

### 4. Cek endpoint

- `GET http://localhost:8080/health` — status aplikasi dan database
- `GET http://localhost:8080/api/v1` — API root
- `GET http://localhost:8080/api/v1/health` — health check versi API

Contoh respons API root:

```json
{
  "success": true,
  "message": "API v1 aktif",
  "data": {
    "version": "v1"
  }
}
```

### 5. Perintah backend lainnya

```powershell
go build ./...
go vet ./...
go test ./...
gofmt -w cmd internal
```

### 6. Menjalankan backend dengan Docker

Dari direktori `Backend/`:

```powershell
docker build -t website-desa-lerep-backend:local .
docker run --rm -p 8080:8080 --env-file .env website-desa-lerep-backend:local
```

Pastikan `Backend/.env` berisi nilai yang valid sebelum menggunakan `--env-file`.

## Menjalankan Full Stack dengan Docker Compose

Dari root repository, siapkan environment terlebih dahulu:

```powershell
Copy-Item .env.example .env
```

Isi nilai yang diperlukan di `.env`. Jangan commit file tersebut.

### Development

```powershell
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

Setelah stack berjalan, frontend memakai hot reload; backend perlu di-restart setelah kode Go berubah.

Akses:

- Aplikasi melalui nginx: `http://localhost`
- Frontend langsung: `http://localhost:3000`
- Backend langsung: `http://localhost:8080`

### Production-style lokal

```powershell
docker compose up -d --build
```

Hanya nginx yang diekspos ke host. Frontend dan backend berada di jaringan internal Docker.

## Menjalankan Frontend Secara Lokal

Dari direktori `Frontend/`:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Salin `Frontend/.env.example` menjadi `Frontend/.env.local` jika perlu mengatur API URL atau Supabase untuk development native. Untuk full stack Compose, gunakan `.env` di root.

Perintah lain:

```powershell
npm run build
npm run lint
npm run typecheck
```

## Dokumentasi

- `docs/PRD.md` — ruang lingkup produk, modul, prioritas P0/P1/P2, dan acceptance criteria.
- `docs/ARCHITECTURE.md` — keputusan arsitektur final yang menjadi acuan implementasi.
- `docs/SCHEMA.md` — draft model database; migrasi belum dibuat.
- `docs/DESIGN.md` — placeholder desain.

## Keamanan

- Jangan commit `.env`, kredensial Supabase, service role key, private key, atau sertifikat.
- Hanya variabel `NEXT_PUBLIC_*` yang boleh tersedia di browser.
- `DATABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` hanya boleh berada di backend/server.
- Gunakan project Supabase terpisah untuk development dan production.
- HTTPS wajib digunakan pada production.
