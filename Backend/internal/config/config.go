package config

import (
	"os"
	"strings"
	"time"
)

type Config struct {
	Port string
	// DatabaseURL dipakai Go API saat runtime. Wajib memakai role runtime
	// khusus (app_runtime), bukan owner/postgres (SCHEMA.md 9.3, AR-12).
	DatabaseURL string
	// MigrationDatabaseURL dipakai hanya oleh cmd/migrate dan cmd/seed.
	// Kredensial owner ini terpisah dan tidak dipakai runtime.
	MigrationDatabaseURL string
	ShutdownTimeout      time.Duration
	CORSAllowedOrigins   []string
}

func Load() Config {
	loadDotEnv(".env")

	return Config{
		Port:                 getEnv("PORT", "8080"),
		DatabaseURL:          os.Getenv("DATABASE_URL"),
		MigrationDatabaseURL: os.Getenv("MIGRATION_DATABASE_URL"),
		ShutdownTimeout:      getDuration("SHUTDOWN_TIMEOUT", 10*time.Second),
		CORSAllowedOrigins:   getList("CORS_ALLOWED_ORIGINS"),
	}
}

func getEnv(key string, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func getDuration(key string, fallback time.Duration) time.Duration {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	duration, err := time.ParseDuration(value)
	if err != nil {
		return fallback
	}
	return duration
}

// getList membaca nilai dipisah koma, misalnya "http://a.com, http://b.com".
func getList(key string) []string {
	var items []string
	for _, item := range strings.Split(os.Getenv(key), ",") {
		if item = strings.TrimSpace(item); item != "" {
			items = append(items, item)
		}
	}
	return items
}
