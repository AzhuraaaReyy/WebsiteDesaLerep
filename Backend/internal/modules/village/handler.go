package village

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"

	"website-desa-lerep/backend/internal/shared/response"
)

// Semua request memiliki timeout (ARCHITECTURE.md 6.6).
const queryTimeout = 5 * time.Second

// Handler menerjemahkan HTTP request/response untuk modul profil desa.
type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// RegisterRoutes mendaftarkan endpoint publik modul profil desa.
func (h *Handler) RegisterRoutes(rg *gin.RouterGroup) {
	rg.GET("/village-profile", h.getProfile)
	rg.GET("/hamlets", h.listHamlets)
	rg.GET("/village-officials", h.listOfficials)
}

// getProfile godoc
//
//	@Summary		Profil desa
//	@Description	Profil desa (singleton). Field kosong bernilai null. `office_hours`: key nama hari huruf kecil (senin..minggu), null berarti tutup; urutan key tidak dijamin. `updated_at` dalam UTC.
//	@Tags			Profil Desa
//	@Produce		json
//	@Success		200	{object}	profileResponse
//	@Failure		404	{object}	response.ErrorEnvelope	"Profil desa belum tersedia"
//	@Failure		500	{object}	response.ErrorEnvelope
//	@Failure		503	{object}	response.ErrorEnvelope	"Database belum dikonfigurasi"
//	@Router			/village-profile [get]
func (h *Handler) getProfile(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), queryTimeout)
	defer cancel()

	profile, err := h.service.GetProfile(ctx)
	if err != nil {
		response.FromError(c, err)
		return
	}
	response.OK(c, "Profil desa berhasil diambil", profile)
}

// listHamlets godoc
//
//	@Summary		Daftar dusun
//	@Description	Dusun aktif, urut nama. `latitude`/`longitude` selalu sama-sama null atau sama-sama terisi. `head_of_hamlet` bisa null.
//	@Tags			Profil Desa
//	@Produce		json
//	@Success		200	{object}	hamletsResponse
//	@Failure		500	{object}	response.ErrorEnvelope
//	@Failure		503	{object}	response.ErrorEnvelope	"Database belum dikonfigurasi"
//	@Router			/hamlets [get]
func (h *Handler) listHamlets(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), queryTimeout)
	defer cancel()

	hamlets, err := h.service.ListHamlets(ctx)
	if err != nil {
		response.FromError(c, err)
		return
	}
	response.OK(c, "Daftar dusun berhasil diambil", hamlets)
}

// listOfficials godoc
//
//	@Summary		Daftar perangkat desa
//	@Description	Perangkat desa aktif, urut `sort_order`. Bagan struktur organisasi disusun dari `parent_official_id` (null = paling atas). `hamlet` hanya terisi untuk perangkat tingkat dusun. Tanggal berformat YYYY-MM-DD.
//	@Tags			Profil Desa
//	@Produce		json
//	@Success		200	{object}	officialsResponse
//	@Failure		500	{object}	response.ErrorEnvelope
//	@Failure		503	{object}	response.ErrorEnvelope	"Database belum dikonfigurasi"
//	@Router			/village-officials [get]
func (h *Handler) listOfficials(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), queryTimeout)
	defer cancel()

	officials, err := h.service.ListOfficials(ctx)
	if err != nil {
		response.FromError(c, err)
		return
	}
	response.OK(c, "Daftar perangkat desa berhasil diambil", officials)
}

// Tipe di bawah hanya untuk dokumentasi Swagger (bentuk envelope sukses).
type profileResponse struct {
	Success bool           `json:"success" example:"true"`
	Message string         `json:"message" example:"Profil desa berhasil diambil"`
	Data    VillageProfile `json:"data"`
}

type hamletsResponse struct {
	Success bool     `json:"success" example:"true"`
	Message string   `json:"message" example:"Daftar dusun berhasil diambil"`
	Data    []Hamlet `json:"data"`
}

type officialsResponse struct {
	Success bool       `json:"success" example:"true"`
	Message string     `json:"message" example:"Daftar perangkat desa berhasil diambil"`
	Data    []Official `json:"data"`
}
