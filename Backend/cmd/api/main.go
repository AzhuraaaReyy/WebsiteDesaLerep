package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"website-desa-lerep/backend/internal/config"
	"website-desa-lerep/backend/internal/database"
	"website-desa-lerep/backend/internal/router"
)

func main() {
	cfg := config.Load()

	pool, err := database.NewPostgresPool(context.Background(), cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database initialization failed: %v", err)
	}
	if pool == nil {
		log.Print("DATABASE_URL is not set; database-backed features are disabled")
	} else {
		defer pool.Close()
	}

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           router.New(pool),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-shutdown
		ctx, cancel := context.WithTimeout(context.Background(), cfg.ShutdownTimeout)
		defer cancel()
		if err := server.Shutdown(ctx); err != nil {
			log.Printf("graceful shutdown failed: %v", err)
		}
	}()

	log.Printf("API listening on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server failed: %v", err)
	}
}
