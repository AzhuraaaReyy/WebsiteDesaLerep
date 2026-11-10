package village

import (
	"encoding/json"
	"time"
)

// VillageProfile adalah data profil desa yang dikirim ke frontend.
// Kolom teknis `singleton_key` sengaja tidak diekspos.
type VillageProfile struct {
	ID           string          `json:"id"`
	VillageName  string          `json:"village_name"`
	VillageCode  *string         `json:"village_code"`
	DistrictName string          `json:"district_name"`
	RegencyName  string          `json:"regency_name"`
	ProvinceName string          `json:"province_name"`
	PostalCode   *string         `json:"postal_code"`
	Address      *string         `json:"address"`
	Phone        *string         `json:"phone"`
	Email        *string         `json:"email"`
	OfficeHours  json.RawMessage `json:"office_hours" swaggertype:"object"`
	WebsiteURL   *string         `json:"website_url"`
	History      *string         `json:"history"`
	Vision       *string         `json:"vision"`
	Mission      *string         `json:"mission"`
	UpdatedAt    time.Time       `json:"updated_at"`
}

// OfficialSummary adalah ringkasan perangkat desa untuk data relasi.
type OfficialSummary struct {
	ID       string `json:"id"`
	FullName string `json:"full_name"`
	Position string `json:"position"`
}

// HamletSummary adalah ringkasan dusun untuk data relasi.
type HamletSummary struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Hamlet struct {
	ID           string           `json:"id"`
	Name         string           `json:"name"`
	Description  *string          `json:"description"`
	Address      *string          `json:"address"`
	Latitude     *float64         `json:"latitude"`
	Longitude    *float64         `json:"longitude"`
	PhotoPath    *string          `json:"photo_path"`
	HeadOfHamlet *OfficialSummary `json:"head_of_hamlet"`
}

type Official struct {
	ID               string         `json:"id"`
	FullName         string         `json:"full_name"`
	Position         string         `json:"position"`
	Duties           *string        `json:"duties"`
	PublicContact    *string        `json:"public_contact"`
	PhotoPath        *string        `json:"photo_path"`
	ParentOfficialID *string        `json:"parent_official_id"`
	SortOrder        int            `json:"sort_order"`
	TermStartDate    *string        `json:"term_start_date"` // format YYYY-MM-DD
	TermEndDate      *string        `json:"term_end_date"`   // format YYYY-MM-DD
	Hamlet           *HamletSummary `json:"hamlet"`
}
