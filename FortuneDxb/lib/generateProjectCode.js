
import { CITIES, getCityCodeByName } from '@/data/countrystatecitylocality';

// Known developer mappings for consistent initials
const DEVELOPER_INITIALS = {
  'emaar': 'EM',
  'emaar properties': 'EM',
  'damac': 'DM',
  'damac properties': 'DM',
  'meraas': 'MR',
  'nakheel': 'NK',
  'sobha': 'SB',
  'sobha realty': 'SB',
  'azizi': 'AZ',
  'azizi developments': 'AZ',
  'binghatti': 'BG',
  'binghatti developers': 'BG',
  'omniyat': 'OM',
  'select group': 'SG',
  'ellington': 'EL',
  'ellington properties': 'EL',
  'danube': 'DN',
  'danube properties': 'DN',
  'samana': 'SM',
  'samana developers': 'SM',
  'mag': 'MG',
  'mag property development': 'MG',
  'aldar': 'AD',
  'aldar properties': 'AD',
  'reportage': 'RP',
  'reportage properties': 'RP',
  'deyaar': 'DY',
  'dubai properties': 'DP',
  'wasl': 'WS',
  'wasl properties': 'WS',
  'majid al futtaim': 'MAF',
  'eagle hills': 'EH',
  'bloom': 'BL',
  'bloom properties': 'BL',
  'object 1': 'O1',
  'tiger': 'TG',
  'tiger properties': 'TG',
  'imtiaz': 'IM',
  'imtiaz developments': 'IM',
  'rak properties': 'RKP',
  'arada': 'AR',
  'tilal properties': 'TP',
  'oro24': 'OR',
};

/**
 * Get city code from city NAME
 * @param {string} cityName - City name (e.g., "Dubai")
 * @returns {string} City code (e.g., "DXB")
 */
export function getCityCode(cityName) {
  if (!cityName) return 'DXB';
  
  // Use the helper from countrystatecitylocality
  return getCityCodeByName(cityName);
}

/**
 * Get developer initials from developer name
 * @param {string} developerName - Developer name
 * @returns {string} 2-3 character initials
 */
export function getDeveloperInitials(developerName) {
  if (!developerName) return 'XX';
  
  const normalized = developerName.toLowerCase().trim();
  
  // Check known mappings first
  if (DEVELOPER_INITIALS[normalized]) {
    return DEVELOPER_INITIALS[normalized];
  }
  
  // Generate initials from name
  const words = developerName.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Single word: take first 2-3 chars
    return words[0].substring(0, 2).toUpperCase();
  } else if (words.length === 2) {
    // Two words: first char of each
    return (words[0][0] + words[1][0]).toUpperCase();
  } else {
    // Multiple words: first char of first 3 significant words
    const significant = words.filter(w => 
      !['the', 'of', 'and', 'for', 'by', 'in', 'at'].includes(w.toLowerCase())
    );
    return significant.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  }
}

/**
 * Generate a project code
 * @param {string} cityName - City NAME (e.g., "Dubai")
 * @param {string} developerName - Developer name
 * @param {number} sequence - Sequence number
 * @param {number} year - Year (default: current year)
 * @returns {string} Project code (e.g., "DXB-EM2025001")
 */
export function generateProjectCode(cityName, developerName, sequence = 1, year = null) {
  const cityCode = getCityCode(cityName);
  const devInitials = getDeveloperInitials(developerName);
  const yr = year || new Date().getFullYear();
  const seq = String(sequence).padStart(3, '0');
  
  return `${cityCode}-${devInitials}${yr}${seq}`;
}

/**
 * Parse a project code
 * @param {string} code - Project code
 * @returns {object|null} Parsed components or null if invalid
 */
export function parseProjectCode(code) {
  if (!code) return null;
  
  const match = code.match(/^([A-Z]{2,3})-([A-Z]{2,3})(\d{4})(\d{3})$/);
  if (!match) return null;
  
  return {
    cityCode: match[1],
    developerInitials: match[2],
    year: parseInt(match[3]),
    sequence: parseInt(match[4]),
  };
}

/**
 * Validate a project code format
 * @param {string} code - Project code
 * @returns {boolean} True if valid format
 */
export function isValidProjectCode(code) {
  return parseProjectCode(code) !== null;
}

/**
 * Get all available city codes
 * @returns {string[]} Array of city codes
 */
export function getAllCityCodes() {
  return CITIES.map(city => city.cityCode);
}

export default {
  getCityCode,
  getDeveloperInitials,
  generateProjectCode,
  parseProjectCode,
  isValidProjectCode,
  getAllCityCodes,
};