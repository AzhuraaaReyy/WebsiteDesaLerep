// Package response menyediakan envelope respons standar (ARCHITECTURE.md 6.2).
package response

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	apperrors "website-desa-lerep/backend/internal/shared/errors"
)

// Envelope adalah format respons sukses.
type Envelope struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
	Meta    any    `json:"meta,omitempty"`
}

// ErrorEnvelope adalah format respons gagal. Field `errors` selalu ada
// (objek kosong bila tidak ada detail), sesuai contoh ARCHITECTURE.md 6.2.
type ErrorEnvelope struct {
	Success bool   `json:"success" example:"false"`
	Message string `json:"message" example:"Terjadi kesalahan"`
	Errors  any    `json:"errors" swaggertype:"object"`
}

func OK(c *gin.Context, message string, data any) {
	c.JSON(http.StatusOK, Envelope{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func Error(c *gin.Context, status int, message string, errs any) {
	if errs == nil {
		errs = gin.H{}
	}
	c.JSON(status, ErrorEnvelope{
		Success: false,
		Message: message,
		Errors:  errs,
	})
}

// FromError mengubah error dari service menjadi respons HTTP.
// Detail internal hanya dicatat di log, tidak dikirim ke pengguna.
func FromError(c *gin.Context, err error) {
	if appErr, ok := apperrors.As(err); ok && appErr.Kind != apperrors.KindInternal {
		var fields any
		if len(appErr.Fields) > 0 {
			fields = appErr.Fields
		}
		Error(c, appErr.HTTPStatus(), appErr.Message, fields)
		return
	}

	log.Printf("internal error %s %s: %v", c.Request.Method, c.FullPath(), err)
	Error(c, http.StatusInternalServerError, "Terjadi kesalahan pada server", nil)
}
