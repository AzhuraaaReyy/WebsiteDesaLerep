package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Envelope struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
	Errors  any    `json:"errors,omitempty"`
	Meta    any    `json:"meta,omitempty"`
}

func OK(c *gin.Context, message string, data any) {
	c.JSON(http.StatusOK, Envelope{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func Error(c *gin.Context, status int, message string, errs any) {
	c.JSON(status, Envelope{
		Success: false,
		Message: message,
		Errors:  errs,
	})
}
