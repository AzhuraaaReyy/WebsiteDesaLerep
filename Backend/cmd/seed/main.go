// Command seed mengisi data awal ke database.
//
// Pemakaian (dari folder Backend/):
//
//	go run ./cmd/seed          # hanya data referensi (seeds/*.sql), aman untuk production
//	go run ./cmd/seed -dummy   # + data dummy development (seeds/dummy/*.sql)
//
// Semua file seed harus idempotent (aman dijalankan berulang kali).
// Setiap file dijalankan dalam satu transaksi: gagal = dibatalkan seluruhnya.
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"time"

	"github.com/jackc/pgx/v5"

	"website-desa-lerep/backend/internal/config"
)

func main() {
	withDummy := flag.Bool("dummy", false, "ikut jalankan data dummy dari seeds/dummy (JANGAN di production)")
	flag.Parse()

	cfg := config.Load()
	if cfg.MigrationDatabaseURL == "" {
		log.Fatal("MIGRATION_DATABASE_URL belum di-set (isi di file .env dengan kredensial owner/postgres)")
	}

	files := sqlFiles("seeds")
	if *withDummy {
		files = append(files, sqlFiles(filepath.Join("seeds", "dummy"))...)
	}
	if len(files) == 0 {
		log.Fatal("tidak ada file seed yang ditemukan; jalankan dari folder Backend/")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	conn, err := pgx.Connect(ctx, cfg.MigrationDatabaseURL)
	if err != nil {
		log.Fatalf("gagal terhubung ke database: %v", err)
	}
	defer conn.Close(context.Background())

	for _, file := range files {
		if err := runFile(ctx, conn, file); err != nil {
			log.Fatalf("seed %s gagal: %v", file, err)
		}
		fmt.Printf("✓ %s\n", file)
	}
	fmt.Println("Seed selesai.")
}

func sqlFiles(dir string) []string {
	files, err := filepath.Glob(filepath.Join(dir, "*.sql"))
	if err != nil {
		log.Fatalf("gagal membaca folder %s: %v", dir, err)
	}
	sort.Strings(files)
	return files
}

func runFile(ctx context.Context, conn *pgx.Conn, path string) error {
	content, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	tx, err := conn.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) // tidak berefek jika sudah commit

	// Exec tanpa argumen memakai simple protocol, sehingga satu file
	// boleh berisi banyak statement SQL.
	if _, err := tx.Exec(ctx, string(content)); err != nil {
		return err
	}
	return tx.Commit(ctx)
}
