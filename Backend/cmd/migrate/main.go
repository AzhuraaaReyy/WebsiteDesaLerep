// Command migrate menjalankan migration database memakai golang-migrate.
//
// Pemakaian (dari folder Backend/):
//
//	go run ./cmd/migrate up          # jalankan semua migration yang belum
//	go run ./cmd/migrate down 1      # batalkan 1 migration terakhir
//	go run ./cmd/migrate version     # lihat versi migration saat ini
//	go run ./cmd/migrate force 2     # perbaiki status "dirty" ke versi tertentu
package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/pgx/v5"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"website-desa-lerep/backend/internal/config"
)

const migrationsSource = "file://migrations"

func main() {
	if len(os.Args) < 2 {
		usage()
	}

	cfg := config.Load()
	if cfg.MigrationDatabaseURL == "" {
		log.Fatal("MIGRATION_DATABASE_URL belum di-set (isi di file .env dengan kredensial owner/postgres)")
	}

	m, err := migrate.New(migrationsSource, toPgx5URL(cfg.MigrationDatabaseURL))
	if err != nil {
		log.Fatalf("gagal menyiapkan migration: %v", err)
	}
	defer m.Close()

	switch os.Args[1] {
	case "up":
		err = m.Up()
	case "down":
		steps := 1
		if len(os.Args) > 2 {
			steps = mustAtoi(os.Args[2])
		}
		err = m.Steps(-steps)
	case "version":
		version, dirty, verr := m.Version()
		if errors.Is(verr, migrate.ErrNilVersion) {
			fmt.Println("Belum ada migration yang dijalankan.")
			return
		}
		if verr != nil {
			log.Fatalf("gagal membaca versi: %v", verr)
		}
		fmt.Printf("Versi migration: %d (dirty: %v)\n", version, dirty)
		return
	case "force":
		if len(os.Args) < 3 {
			usage()
		}
		err = m.Force(mustAtoi(os.Args[2]))
	default:
		usage()
	}

	if errors.Is(err, migrate.ErrNoChange) {
		fmt.Println("Tidak ada perubahan: database sudah versi terbaru.")
		return
	}
	if err != nil {
		log.Fatalf("migration gagal: %v", err)
	}
	fmt.Println("Migration berhasil.")
}

// golang-migrate memakai skema URL "pgx5://" untuk driver pgx v5.
func toPgx5URL(databaseURL string) string {
	for _, prefix := range []string{"postgresql://", "postgres://"} {
		if strings.HasPrefix(databaseURL, prefix) {
			return "pgx5://" + strings.TrimPrefix(databaseURL, prefix)
		}
	}
	return databaseURL
}

func mustAtoi(value string) int {
	n, err := strconv.Atoi(value)
	if err != nil || n < 0 {
		log.Fatalf("angka tidak valid: %q", value)
	}
	return n
}

func usage() {
	fmt.Fprintln(os.Stderr, "Pemakaian: go run ./cmd/migrate [up | down [N] | version | force V]")
	os.Exit(2)
}
