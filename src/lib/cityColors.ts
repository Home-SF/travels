// ============================================================
// City color lookup — all trips
// Used by client components that read from Firestore (which
// doesn't store colors). Keep in sync with globals.css vars.
// ============================================================

export interface CityColors {
  color: string;
  colorSoft: string;
}

const cityColors: Record<string, CityColors> = {
  // Paris-London 2026
  paris:        { color: '#E1512B', colorSoft: '#FBE3DA' },
  london:       { color: '#1D4E89', colorSoft: '#DCE6F2' },

  // Asia 2026
  tokyo:        { color: '#C0392B', colorSoft: '#FADBD8' },
  kualalumpur:  { color: '#1A7A5E', colorSoft: '#D5EDE7' },
  singapore:    { color: '#6C3483', colorSoft: '#E8DAEF' },

  // Europe 2025
  genoa:        { color: '#2471A3', colorSoft: '#D6EAF8' },
  montecarlo:   { color: '#B7950B', colorSoft: '#FCF3CF' },
  livorno:      { color: '#1E8449', colorSoft: '#D5F5E3' },
  rome:         { color: '#A04000', colorSoft: '#FAE5D3' },
  sorrento:     { color: '#117A65', colorSoft: '#D1F2EB' },
  santorini:    { color: '#1A5276', colorSoft: '#D6EAF8' },
  rhodes:       { color: '#7B241C', colorSoft: '#FADBD8' },
  antalya:      { color: '#884EA0', colorSoft: '#F4ECF7' },
  bodrum:       { color: '#1F618D', colorSoft: '#D6EAF8' },
  patmos:       { color: '#1E8449', colorSoft: '#D5F5E3' },
  athens:       { color: '#9A7D0A', colorSoft: '#FCF3CF' },

  // Italy 2024
  florence:     { color: '#6E2F0D', colorSoft: '#FAEAD3' },
  siena:        { color: '#7D6608', colorSoft: '#FCF3CF' },
  bologna:      { color: '#922B21', colorSoft: '#FADBD8' },

  // Japan 2023
  kyoto:        { color: '#76448A', colorSoft: '#F4ECF7' },
  nagano:       { color: '#1F618D', colorSoft: '#D6EAF8' },

  // Thailand 2023
  bangkok:      { color: '#1E8449', colorSoft: '#D5F5E3' },
  pattaya:      { color: '#117A65', colorSoft: '#D1F2EB' },
  udonthani:    { color: '#784212', colorSoft: '#FDEBD0' },

  // Bordeaux-Spain 2022
  bordeaux:     { color: '#6E2F0D', colorSoft: '#FAEAD3' },
  bilbao:       { color: '#1A5276', colorSoft: '#D6EAF8' },
  sansebastian: { color: '#1E8449', colorSoft: '#D5F5E3' },
  mutriku:      { color: '#117A65', colorSoft: '#D1F2EB' },
  bayonne:      { color: '#7D6608', colorSoft: '#FCF3CF' },

  // Generic travel/transit
  travel:       { color: '#B8842E', colorSoft: '#F3E4C4' },
};

export function getCityColors(slug: string): CityColors {
  return cityColors[slug] ?? { color: '#241F1B', colorSoft: '#E8E4E0' };
}

export default cityColors;
