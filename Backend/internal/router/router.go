package router

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "website-desa-lerep/backend/docs" // dokumentasi OpenAPI hasil `swag init`
	"website-desa-lerep/backend/internal/middleware"
	"website-desa-lerep/backend/internal/modules/village"
	"website-desa-lerep/backend/internal/shared/response"
)

type Options struct {
	CORSAllowedOrigins []string
}

func New(pool *pgxpool.Pool, opts Options) *gin.Engine {
	engine := gin.New()
	engine.Use(gin.Logger(), gin.Recovery(), middleware.CORS(opts.CORSAllowedOrigins))

	engine.NoRoute(func(c *gin.Context) {
		response.Error(c, http.StatusNotFound, "Endpoint tidak ditemukan", nil)
	})

	engine.GET("/health", healthHandler(pool))
	engine.GET("/api/v1", func(c *gin.Context) {
		response.OK(c, "API v1 aktif", gin.H{"version": "v1"})
	})

	apiV1 := engine.Group("/api/v1")
	apiV1.GET("/health", healthHandler(pool))

	// Swagger UI (ARCHITECTURE.md 6.3): /api/v1/docs/index.html
	apiV1.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Endpoint di bawah ini butuh database. Jika pool nil, requireDatabase
	// menghentikan request dengan 503 sebelum handler dipanggil.
	dbRoutes := apiV1.Group("", requireDatabase(pool))
	village.NewHandler(village.NewService(village.NewRepository(pool))).RegisterRoutes(dbRoutes)

	return engine
}

// requireDatabase menolak request dengan 503 jika DATABASE_URL tidak di-set.
func requireDatabase(pool *pgxpool.Pool) gin.HandlerFunc {
	return func(c *gin.Context) {
		if pool == nil {
			response.Error(c, http.StatusServiceUnavailable, "Database belum dikonfigurasi", nil)
			c.Abort()
			return
		}
		c.Next()
	}
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
