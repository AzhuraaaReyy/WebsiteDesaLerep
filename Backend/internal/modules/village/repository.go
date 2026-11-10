package village

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Repository berisi query SQL untuk modul profil desa.
// Error database dikembalikan apa adanya (dibungkus konteks); penerjemahan
// ke business error dilakukan di service (ARCHITECTURE.md 5.7).
type Repository struct {
	pool *pgxpool.Pool
}

func NewRepository(pool *pgxpool.Pool) *Repository {
	return &Repository{pool: pool}
}

func (r *Repository) GetProfile(ctx context.Context) (VillageProfile, error) {
	const query = `
		SELECT id, village_name, village_code, district_name, regency_name, province_name,
		       postal_code, address, phone, email, office_hours, website_url,
		       history, vision, mission, updated_at
		FROM village_profiles
		LIMIT 1`

	var p VillageProfile
	var officeHours []byte
	err := r.pool.QueryRow(ctx, query).Scan(
		&p.ID, &p.VillageName, &p.VillageCode, &p.DistrictName, &p.RegencyName, &p.ProvinceName,
		&p.PostalCode, &p.Address, &p.Phone, &p.Email, &officeHours, &p.WebsiteURL,
		&p.History, &p.Vision, &p.Mission, &p.UpdatedAt,
	)
	if err != nil {
		return VillageProfile{}, fmt.Errorf("query village profile: %w", err)
	}
	if officeHours != nil {
		p.OfficeHours = officeHours
	}
	p.UpdatedAt = p.UpdatedAt.UTC() // API selalu UTC; frontend menampilkan Asia/Jakarta
	return p, nil
}

func (r *Repository) ListActiveHamlets(ctx context.Context) ([]Hamlet, error) {
	const query = `
		SELECT h.id, h.name, h.description, h.address, h.latitude, h.longitude, h.photo_path,
		       o.id, o.full_name, o.position
		FROM hamlets h
		LEFT JOIN village_officials o
		       ON o.id = h.head_of_hamlet_official_id AND o.is_active
		WHERE h.is_active
		ORDER BY h.name`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("query hamlets: %w", err)
	}
	defer rows.Close()

	hamlets := []Hamlet{}
	for rows.Next() {
		var h Hamlet
		var headID, headName, headPosition *string
		if err := rows.Scan(
			&h.ID, &h.Name, &h.Description, &h.Address, &h.Latitude, &h.Longitude, &h.PhotoPath,
			&headID, &headName, &headPosition,
		); err != nil {
			return nil, fmt.Errorf("scan hamlet: %w", err)
		}
		if headID != nil {
			h.HeadOfHamlet = &OfficialSummary{ID: *headID, FullName: *headName, Position: *headPosition}
		}
		hamlets = append(hamlets, h)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate hamlets: %w", err)
	}
	return hamlets, nil
}

func (r *Repository) ListActiveOfficials(ctx context.Context) ([]Official, error) {
	const query = `
		SELECT o.id, o.full_name, o.position, o.duties, o.public_contact, o.photo_path,
		       o.parent_official_id, o.sort_order,
		       to_char(o.term_start_date, 'YYYY-MM-DD'), to_char(o.term_end_date, 'YYYY-MM-DD'),
		       h.id, h.name
		FROM village_officials o
		LEFT JOIN hamlets h ON h.id = o.hamlet_id
		WHERE o.is_active
		ORDER BY o.sort_order, o.full_name`

	rows, err := r.pool.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("query officials: %w", err)
	}
	defer rows.Close()

	officials := []Official{}
	for rows.Next() {
		var o Official
		var hamletID, hamletName *string
		if err := rows.Scan(
			&o.ID, &o.FullName, &o.Position, &o.Duties, &o.PublicContact, &o.PhotoPath,
			&o.ParentOfficialID, &o.SortOrder,
			&o.TermStartDate, &o.TermEndDate,
			&hamletID, &hamletName,
		); err != nil {
			return nil, fmt.Errorf("scan official: %w", err)
		}
		if hamletID != nil {
			o.Hamlet = &HamletSummary{ID: *hamletID, Name: *hamletName}
		}
		officials = append(officials, o)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("iterate officials: %w", err)
	}
	return officials, nil
}
