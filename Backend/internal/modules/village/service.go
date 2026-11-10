package village

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"

	apperrors "website-desa-lerep/backend/internal/shared/errors"
)

// Service berisi logika bisnis modul profil desa dan menerjemahkan error
// database menjadi business error (ARCHITECTURE.md 5.7).
// Operasi admin (update profil + snapshot versi dalam satu transaksi,
// SCHEMA.md B.1) akan ditambahkan di sini.
type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetProfile(ctx context.Context) (VillageProfile, error) {
	profile, err := s.repo.GetProfile(ctx)
	if errors.Is(err, pgx.ErrNoRows) {
		return VillageProfile{}, apperrors.NotFound("Profil desa belum tersedia", err)
	}
	return profile, err
}

func (s *Service) ListHamlets(ctx context.Context) ([]Hamlet, error) {
	return s.repo.ListActiveHamlets(ctx)
}

func (s *Service) ListOfficials(ctx context.Context) ([]Official, error) {
	return s.repo.ListActiveOfficials(ctx)
}
