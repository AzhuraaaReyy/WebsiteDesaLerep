package config

import (
	"bufio"
	"os"
	"strings"
)

// loadDotEnv membaca file .env (jika ada) dan mengisi environment variable
// yang BELUM di-set. Variabel yang sudah ada di environment (misalnya dari
// Docker Compose atau di-export manual) tidak akan ditimpa.
//
// Format yang didukung:
//
//	KEY=value
//	KEY="value"   (tanda kutip dibuang)
//	# komentar
func loadDotEnv(path string) {
	file, err := os.Open(path)
	if err != nil {
		return // file tidak ada: abaikan, pakai environment biasa
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		line = strings.TrimPrefix(line, "export ")

		key, value, found := strings.Cut(line, "=")
		if !found {
			continue
		}
		key = strings.TrimSpace(key)
		value = trimQuotes(strings.TrimSpace(value))
		if key == "" {
			continue
		}

		if _, exists := os.LookupEnv(key); !exists {
			os.Setenv(key, value)
		}
	}
}

func trimQuotes(value string) string {
	if len(value) >= 2 {
		first, last := value[0], value[len(value)-1]
		if (first == '"' && last == '"') || (first == '\'' && last == '\'') {
			return value[1 : len(value)-1]
		}
	}
	return value
}
