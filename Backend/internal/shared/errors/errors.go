// Package errors berisi business error aplikasi (ARCHITECTURE.md 5.7, 23.3).
//
// Alur:
//  1. Repository mengembalikan error database apa adanya (dibungkus konteks).
//  2. Service menerjemahkannya menjadi *AppError.
//  3. Handler meneruskan error ke response.FromError, yang memetakan Kind ke
//     HTTP status. Error yang bukan *AppError dianggap internal: dicatat di
//     log, dan pengguna hanya menerima pesan umum.
package errors

import (
	"errors"
	"net/http"
)

type Kind int

const (
	KindInternal Kind = iota
	KindNotFound
	KindInvalid
	KindUnauthorized
	KindForbidden
	KindConflict
)

// AppError adalah error yang pesannya aman ditampilkan ke pengguna.
type AppError struct {
	Kind    Kind
	Message string
	Fields  map[string]string // detail validasi per field (opsional)
	Err     error             // penyebab asli; hanya untuk log
}

func (e *AppError) Error() string {
	if e.Err != nil {
		return e.Message + ": " + e.Err.Error()
	}
	return e.Message
}

func (e *AppError) Unwrap() error { return e.Err }

// HTTPStatus memetakan jenis error ke kode HTTP.
func (e *AppError) HTTPStatus() int {
	switch e.Kind {
	case KindNotFound:
		return http.StatusNotFound
	case KindInvalid:
		return http.StatusUnprocessableEntity
	case KindUnauthorized:
		return http.StatusUnauthorized
	case KindForbidden:
		return http.StatusForbidden
	case KindConflict:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}

func NotFound(message string, cause error) *AppError {
	return &AppError{Kind: KindNotFound, Message: message, Err: cause}
}

func Invalid(message string, fields map[string]string) *AppError {
	return &AppError{Kind: KindInvalid, Message: message, Fields: fields}
}

// As mengambil *AppError dari rantai error.
func As(err error) (*AppError, bool) {
	var appErr *AppError
	ok := errors.As(err, &appErr)
	return appErr, ok
}
