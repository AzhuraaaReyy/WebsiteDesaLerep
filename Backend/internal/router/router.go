package router

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"website-desa-lerep/backend/internal/shared/response"
)

func New(pool *pgxpool.Pool) *gin.Engine {
	engine := gin.New()
	engine.Use(gin.Logger(), gin.Recovery())

	engine.GET("/health", healthHandler(pool))
	engine.GET("/api/v1", func(c *gin.Context) {
		response.OK(c, "API v1 aktif", gin.H{"version": "v1"})
	})

	apiV1 := engine.Group("/api/v1")
	apiV1.GET("/health", healthHandler(pool))

	return engine
}

func healthHandler(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		status := http.StatusOK
		healthStatus := "ok"
		databaseStatus := "not_configured"

		if pool != nil {
			ctx, cancel := context.WithTimeout(c.Request.Context(), 2*time.Second)
			defer cancel()

			if err := pool.Ping(ctx); err != nil {
				status = http.StatusServiceUnavailable
				healthStatus = "degraded"
				databaseStatus = "unavailable"
			} else {
				databaseStatus = "ok"
			}
		}

		c.JSON(status, gin.H{
			"status":   healthStatus,
			"database": databaseStatus,
		})
	}
}
