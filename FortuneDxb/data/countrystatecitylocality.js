// ==================== COUNTRIES ====================
export const COUNTRIES = [
  { 
    id: 1, 
    code: 'AE', 
    name: 'United Arab Emirates', 
    flag: '🇦🇪', 
    phonecode: '971', 
    currency: 'AED' 
  },
];

// ==================== STATES/EMIRATES ====================
export const STATES = [
  { id: 1, name: 'Dubai', stateCode: 'DU', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 2, name: 'Abu Dhabi', stateCode: 'AZ', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 3, name: 'Sharjah', stateCode: 'SH', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 4, name: 'Ajman', stateCode: 'AJ', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 5, name: 'Ras Al Khaimah', stateCode: 'RK', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 6, name: 'Fujairah', stateCode: 'FU', countryId: 1, countryName: 'United Arab Emirates' },
  { id: 7, name: 'Umm Al Quwain', stateCode: 'UQ', countryId: 1, countryName: 'United Arab Emirates' },
];

// ==================== CITIES ====================
export const CITIES = [
  // Dubai Emirate
  { id: 1, name: 'Dubai', cityCode: 'DXB', stateId: 1, stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 2, name: 'Hatta', cityCode: 'HTT', stateId: 1, stateName: 'Dubai', countryName: 'United Arab Emirates' },

  // Abu Dhabi Emirate
  { id: 3, name: 'Abu Dhabi City', cityCode: 'AUH', stateId: 2, stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 4, name: 'Al Ain', cityCode: 'AAN', stateId: 2, stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },

  // Sharjah Emirate
  { id: 5, name: 'Sharjah City', cityCode: 'SHJ', stateId: 3, stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 6, name: 'Khor Fakkan', cityCode: 'KFK', stateId: 3, stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 7, name: 'Kalba', cityCode: 'KLB', stateId: 3, stateName: 'Sharjah', countryName: 'United Arab Emirates' },

  // Ajman Emirate
  { id: 8, name: 'Ajman City', cityCode: 'AJM', stateId: 4, stateName: 'Ajman', countryName: 'United Arab Emirates' },

  // Ras Al Khaimah Emirate
  { id: 9, name: 'Ras Al Khaimah City', cityCode: 'RAK', stateId: 5, stateName: 'Ras Al Khaimah', countryName: 'United Arab Emirates' },

  // Fujairah Emirate
  { id: 10, name: 'Fujairah City', cityCode: 'FJR', stateId: 6, stateName: 'Fujairah', countryName: 'United Arab Emirates' },
  { id: 11, name: 'Dibba Al Fujairah', cityCode: 'DBF', stateId: 6, stateName: 'Fujairah', countryName: 'United Arab Emirates' },

  // Umm Al Quwain Emirate
  { id: 12, name: 'Umm Al Quwain City', cityCode: 'UAQ', stateId: 7, stateName: 'Umm Al Quwain', countryName: 'United Arab Emirates' },
];

// ==================== LOCALITIES ====================
export const LOCALITIES = [
  // ==================== DUBAI - DUBAI CITY (Detailed - 115 areas) ====================
  { id: 1, name: 'Al Baraha', localityCode: 'DXB-BARAHA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 2, name: 'Al Barsha', localityCode: 'DXB-BARSHA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 3, name: 'Al Barsha South', localityCode: 'DXB-BARSHAS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 4, name: 'Al Furjan', localityCode: 'DXB-FURJAN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 5, name: 'Al Garhoud', localityCode: 'DXB-GARHOUD', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 6, name: 'Al Jaddaf', localityCode: 'DXB-JADDAF', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 7, name: 'Al Karama', localityCode: 'DXB-KARAMA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 8, name: 'Al Khawaneej', localityCode: 'DXB-KHAWANEEJ', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 9, name: 'Al Mamzar', localityCode: 'DXB-MAMZAR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 10, name: 'Al Manara', localityCode: 'DXB-MANARA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 11, name: 'Al Mankhool', localityCode: 'DXB-MANKHOOL', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 12, name: 'Al Mina', localityCode: 'DXB-MINA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 13, name: 'Al Mizhar', localityCode: 'DXB-MIZHAR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 14, name: 'Al Muhaisnah', localityCode: 'DXB-MUHAISNAH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 15, name: 'Al Nahda', localityCode: 'DXB-NAHDA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 16, name: 'Al Quoz', localityCode: 'DXB-QUOZ', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 17, name: 'Al Qusais', localityCode: 'DXB-QUSAIS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 18, name: 'Al Raffa', localityCode: 'DXB-RAFFA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 19, name: 'Al Rashidiya', localityCode: 'DXB-RASHIDIYA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 20, name: 'Al Rigga', localityCode: 'DXB-RIGGA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 21, name: 'Al Safa', localityCode: 'DXB-SAFA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 22, name: 'Al Satwa', localityCode: 'DXB-SATWA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 23, name: 'Al Sufouh', localityCode: 'DXB-SUFOUH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 24, name: 'Al Twar', localityCode: 'DXB-TWAR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 25, name: 'Al Warqa', localityCode: 'DXB-WARQA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 26, name: 'Al Warsan', localityCode: 'DXB-WARSAN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 27, name: 'Al Wasl', localityCode: 'DXB-WASL', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 28, name: 'Arabian Ranches', localityCode: 'DXB-ARABRANCH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 29, name: 'Arabian Ranches 2', localityCode: 'DXB-ARABRANCH2', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 30, name: 'Arabian Ranches 3', localityCode: 'DXB-ARABRANCH3', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 31, name: 'Arjan', localityCode: 'DXB-ARJAN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 32, name: 'Barsha Heights (TECOM)', localityCode: 'DXB-TECOM', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 33, name: 'Bluewaters Island', localityCode: 'DXB-BLUEWATERS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 34, name: 'Business Bay', localityCode: 'DXB-BUSINESSBAY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 35, name: 'City Walk', localityCode: 'DXB-CITYWALK', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 36, name: 'Creek Harbour', localityCode: 'DXB-CREEKHARBOUR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 37, name: 'Culture Village', localityCode: 'DXB-CULTUREVILLAGE', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 38, name: 'Damac Hills', localityCode: 'DXB-DAMACHILLS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 39, name: 'Damac Hills 2', localityCode: 'DXB-DAMACHILLS2', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 40, name: 'Deira', localityCode: 'DXB-DEIRA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 41, name: 'Discovery Gardens', localityCode: 'DXB-DISCOVERY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 42, name: 'Downtown Dubai', localityCode: 'DXB-DOWNTOWN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 43, name: 'Dubai Design District (D3)', localityCode: 'DXB-D3', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 44, name: 'Dubai Festival City', localityCode: 'DXB-DFC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 45, name: 'Dubai Healthcare City', localityCode: 'DXB-DHCC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 46, name: 'Dubai Hills Estate', localityCode: 'DXB-DUBAIHILLS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 47, name: 'Dubai Industrial City', localityCode: 'DXB-DIC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 48, name: 'Dubai International City', localityCode: 'DXB-INTLCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 49, name: 'Dubai Internet City', localityCode: 'DXB-INTERNETCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 50, name: 'Dubai Investment Park (DIP)', localityCode: 'DXB-DIP', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 51, name: 'Dubai Knowledge Park', localityCode: 'DXB-DKP', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 52, name: 'Dubai Land', localityCode: 'DXB-DUBAILAND', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 53, name: 'Dubai Marina', localityCode: 'DXB-MARINA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 54, name: 'Dubai Media City', localityCode: 'DXB-DMC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 55, name: 'Dubai Production City', localityCode: 'DXB-DPC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 56, name: 'Dubai Silicon Oasis', localityCode: 'DXB-DSO', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 57, name: 'Dubai South', localityCode: 'DXB-DUBAISOUTH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 58, name: 'Dubai Sports City', localityCode: 'DXB-DSC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 59, name: 'Dubai Studio City', localityCode: 'DXB-STUDIOCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 60, name: 'Dubai World Central', localityCode: 'DXB-DWC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 61, name: 'Emirates Hills', localityCode: 'DXB-EMIRATESHILLS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 62, name: 'Emirates Living', localityCode: 'DXB-EMIRATESLIVING', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 63, name: 'Expo City Dubai', localityCode: 'DXB-EXPOCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 64, name: 'Green Community', localityCode: 'DXB-GREENCOMMUNITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 65, name: 'Greens', localityCode: 'DXB-GREENS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 66, name: 'Hor Al Anz', localityCode: 'DXB-HORALANZ', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 67, name: 'International Media Production Zone', localityCode: 'DXB-IMPZ', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 68, name: 'Jebel Ali', localityCode: 'DXB-JEBELALI', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 69, name: 'Jebel Ali Free Zone', localityCode: 'DXB-JAFZA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 70, name: 'Jumeirah', localityCode: 'DXB-JUMEIRAH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 71, name: 'Jumeirah Bay Island', localityCode: 'DXB-JUMEIRAHBAY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 72, name: 'Jumeirah Beach Residence (JBR)', localityCode: 'DXB-JBR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 73, name: 'Jumeirah Golf Estates', localityCode: 'DXB-JGE', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 74, name: 'Jumeirah Heights', localityCode: 'DXB-JUMEIRAHHEIGHTS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 75, name: 'Jumeirah Islands', localityCode: 'DXB-JUMEIRAHISLANDS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 76, name: 'Jumeirah Lake Towers (JLT)', localityCode: 'DXB-JLT', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 77, name: 'Jumeirah Park', localityCode: 'DXB-JUMEIRAHPARK', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 78, name: 'Jumeirah Village Circle (JVC)', localityCode: 'DXB-JVC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 79, name: 'Jumeirah Village Triangle (JVT)', localityCode: 'DXB-JVT', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 80, name: 'La Mer', localityCode: 'DXB-LAMER', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 81, name: 'Liwan', localityCode: 'DXB-LIWAN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 82, name: 'Madinat Jumeirah', localityCode: 'DXB-MADINATJUMEIRAH', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 83, name: 'Marsa Dubai', localityCode: 'DXB-MARSA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 84, name: 'MBR City', localityCode: 'DXB-MBRCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 85, name: 'Meadows', localityCode: 'DXB-MEADOWS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 86, name: 'Mirdif', localityCode: 'DXB-MIRDIF', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 87, name: 'Motor City', localityCode: 'DXB-MOTORCITY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 88, name: 'Mudon', localityCode: 'DXB-MUDON', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 89, name: 'Nad Al Sheba', localityCode: 'DXB-NADALSHEBA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 90, name: 'Naif', localityCode: 'DXB-NAIF', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 91, name: 'Oud Metha', localityCode: 'DXB-OUDMETHA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 92, name: 'Palm Jumeirah', localityCode: 'DXB-PALM', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 93, name: 'Port Rashid', localityCode: 'DXB-PORTRASHID', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 94, name: 'Port Saeed', localityCode: 'DXB-PORTSAEED', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 95, name: 'Ras Al Khor', localityCode: 'DXB-RASALKHOR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 96, name: 'Remraam', localityCode: 'DXB-REMRAAM', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 97, name: 'Serena', localityCode: 'DXB-SERENA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 98, name: 'Springs', localityCode: 'DXB-SPRINGS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 99, name: 'The Gardens', localityCode: 'DXB-GARDENS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 100, name: 'The Lakes', localityCode: 'DXB-LAKES', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 101, name: 'The Views', localityCode: 'DXB-VIEWS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 102, name: 'The Villa', localityCode: 'DXB-VILLA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 103, name: 'Tilal Al Ghaf', localityCode: 'DXB-TILALALGHAF', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 104, name: 'Town Square', localityCode: 'DXB-TOWNSQUARE', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 105, name: 'Trade Centre', localityCode: 'DXB-TRADECENTRE', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 106, name: 'Umm Al Sheif', localityCode: 'DXB-UMMALSHEIF', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 107, name: 'Umm Hurair', localityCode: 'DXB-UMMHURAIR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 108, name: 'Umm Ramool', localityCode: 'DXB-UMMRAMOOL', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 109, name: 'Umm Suqeim', localityCode: 'DXB-UMMSUQEIM', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 110, name: 'Villanova', localityCode: 'DXB-VILLANOVA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 111, name: 'Wadi Al Safa', localityCode: 'DXB-WADIALSAFA', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 112, name: 'World Trade Centre', localityCode: 'DXB-WTC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 113, name: 'Zabeel', localityCode: 'DXB-ZABEEL', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 114, name: 'DIFC', localityCode: 'DXB-DIFC', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 115, name: 'Bur Dubai', localityCode: 'DXB-BURDUBAI', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },

  // ==================== DUBAI - HATTA ====================
  { id: 116, name: 'Hatta Town', localityCode: 'HTT-TOWN', cityName: 'Hatta', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  { id: 117, name: 'Hatta Heritage Village', localityCode: 'HTT-HERITAGE', cityName: 'Hatta', stateName: 'Dubai', countryName: 'United Arab Emirates' },

  // ==================== ABU DHABI - ABU DHABI CITY ====================
  { id: 118, name: 'Al Bateen', localityCode: 'AUH-BATEEN', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 119, name: 'Al Reem Island', localityCode: 'AUH-REEM', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 120, name: 'Yas Island', localityCode: 'AUH-YAS', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 121, name: 'Saadiyat Island', localityCode: 'AUH-SAADIYAT', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 122, name: 'Khalifa City', localityCode: 'AUH-KHALIFACITY', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 123, name: 'Corniche Area', localityCode: 'AUH-CORNICHE', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 124, name: 'Al Maryah Island', localityCode: 'AUH-MARYAH', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 125, name: 'Al Raha Beach', localityCode: 'AUH-RAHABEACH', cityName: 'Abu Dhabi City', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },

  // ==================== ABU DHABI - AL AIN ====================
  { id: 126, name: 'Al Ain Central', localityCode: 'AAN-CENTRAL', cityName: 'Al Ain', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },
  { id: 127, name: 'Al Jimi', localityCode: 'AAN-JIMI', cityName: 'Al Ain', stateName: 'Abu Dhabi', countryName: 'United Arab Emirates' },

  // ==================== SHARJAH - SHARJAH CITY ====================
  { id: 128, name: 'Al Khan', localityCode: 'SHJ-KHAN', cityName: 'Sharjah City', stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 129, name: 'Al Majaz', localityCode: 'SHJ-MAJAZ', cityName: 'Sharjah City', stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 130, name: 'Al Nahda', localityCode: 'SHJ-NAHDA', cityName: 'Sharjah City', stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 131, name: 'Al Taawun', localityCode: 'SHJ-TAAWUN', cityName: 'Sharjah City', stateName: 'Sharjah', countryName: 'United Arab Emirates' },
  { id: 132, name: 'Muwaileh', localityCode: 'SHJ-MUWAILEH', cityName: 'Sharjah City', stateName: 'Sharjah', countryName: 'United Arab Emirates' },

  // ==================== SHARJAH - KHOR FAKKAN ====================
  { id: 133, name: 'Khor Fakkan City Center', localityCode: 'KFK-CENTER', cityName: 'Khor Fakkan', stateName: 'Sharjah', countryName: 'United Arab Emirates' },

  // ==================== SHARJAH - KALBA ====================
  { id: 134, name: 'Kalba City Center', localityCode: 'KLB-CENTER', cityName: 'Kalba', stateName: 'Sharjah', countryName: 'United Arab Emirates' },

  // ==================== AJMAN - AJMAN CITY ====================
  { id: 135, name: 'Al Nuaimiya', localityCode: 'AJM-NUAIMIYA', cityName: 'Ajman City', stateName: 'Ajman', countryName: 'United Arab Emirates' },
  { id: 136, name: 'Ajman Corniche', localityCode: 'AJM-CORNICHE', cityName: 'Ajman City', stateName: 'Ajman', countryName: 'United Arab Emirates' },
  { id: 137, name: 'Al Rashidiya', localityCode: 'AJM-RASHIDIYA', cityName: 'Ajman City', stateName: 'Ajman', countryName: 'United Arab Emirates' },
  { id: 138, name: 'Emirates City', localityCode: 'AJM-EMIRATESCITY', cityName: 'Ajman City', stateName: 'Ajman', countryName: 'United Arab Emirates' },

  // ==================== RAS AL KHAIMAH - RAK CITY ====================
  { id: 139, name: 'Al Marjan Island', localityCode: 'RAK-MARJAN', cityName: 'Ras Al Khaimah City', stateName: 'Ras Al Khaimah', countryName: 'United Arab Emirates' },
  { id: 140, name: 'Al Hamra Village', localityCode: 'RAK-HAMRA', cityName: 'Ras Al Khaimah City', stateName: 'Ras Al Khaimah', countryName: 'United Arab Emirates' },
  { id: 141, name: 'Mina Al Arab', localityCode: 'RAK-MINALARAB', cityName: 'Ras Al Khaimah City', stateName: 'Ras Al Khaimah', countryName: 'United Arab Emirates' },
  { id: 142, name: 'RAK Downtown', localityCode: 'RAK-DOWNTOWN', cityName: 'Ras Al Khaimah City', stateName: 'Ras Al Khaimah', countryName: 'United Arab Emirates' },

  // ==================== FUJAIRAH - FUJAIRAH CITY ====================
  { id: 143, name: 'Fujairah Corniche', localityCode: 'FJR-CORNICHE', cityName: 'Fujairah City', stateName: 'Fujairah', countryName: 'United Arab Emirates' },
  { id: 144, name: 'Fujairah Free Zone', localityCode: 'FJR-FREEZONE', cityName: 'Fujairah City', stateName: 'Fujairah', countryName: 'United Arab Emirates' },

  // ==================== FUJAIRAH - DIBBA ====================
  { id: 145, name: 'Dibba Town', localityCode: 'DBF-TOWN', cityName: 'Dibba Al Fujairah', stateName: 'Fujairah', countryName: 'United Arab Emirates' },

  // ==================== UMM AL QUWAIN - UAQ CITY ====================
  { id: 146, name: 'UAQ Marina', localityCode: 'UAQ-MARINA', cityName: 'Umm Al Quwain City', stateName: 'Umm Al Quwain', countryName: 'United Arab Emirates' },
  { id: 147, name: 'UAQ Old Town', localityCode: 'UAQ-OLDTOWN', cityName: 'Umm Al Quwain City', stateName: 'Umm Al Quwain', countryName: 'United Arab Emirates' },

  // ==================== NEW LOCALITIES ADDED FOR MIGRATION ====================
  
  // The Valley - Emaar Master Development
  { id: 148, name: 'The Valley', localityCode: 'DXB-THEVALLEY', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Sheikh Zayed Road - Major Road Area
  { id: 149, name: 'Sheikh Zayed Road', localityCode: 'DXB-SZR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Sobha Hartland - Community in MBR City
  { id: 150, name: 'Sobha Hartland', localityCode: 'DXB-SOBHAHARTLAND', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Dubai Harbour - New Waterfront Development
  { id: 151, name: 'Dubai Harbour', localityCode: 'DXB-DUBAIHARBOUR', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Dubai Science Park - Tech Hub Area
  { id: 152, name: 'Dubai Science Park', localityCode: 'DXB-SCIENCEPARK', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Emaar Beachfront - Waterfront Development
  { id: 153, name: 'Emaar Beachfront', localityCode: 'DXB-EMARBEACHFRONT', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Meydan - District in MBR City
  { id: 154, name: 'Meydan', localityCode: 'DXB-MEYDAN', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Port de La Mer - Meraas Waterfront
  { id: 155, name: 'Port de La Mer', localityCode: 'DXB-PORTDELAMER', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Damac Lagoons - Master Community
  { id: 156, name: 'Damac Lagoons', localityCode: 'DXB-DAMACLAGOONS', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
  
  // Jebel Ali Village - Residential Area
  { id: 157, name: 'Jebel Ali Village', localityCode: 'DXB-JEBELALIV', cityName: 'Dubai', stateName: 'Dubai', countryName: 'United Arab Emirates' },
];

// ==================== DEFAULT VALUES (NAMES) ====================
export const DEFAULT_COUNTRY = 'United Arab Emirates';
export const DEFAULT_STATE = 'Dubai';
export const DEFAULT_CITY = 'Dubai';

// ==================== HELPER FUNCTIONS (BY NAME) ====================

/**
 * Get states/emirates by country NAME
 */
export const getStatesByCountryName = (countryName) => {
  return STATES.filter(state => state.countryName === countryName);
};

/**
 * Get cities by state NAME
 */
export const getCitiesByStateName = (stateName) => {
  return CITIES.filter(city => city.stateName === stateName);
};

/**
 * Get localities by city NAME
 */
export const getLocalitiesByCityName = (cityName) => {
  return LOCALITIES.filter(locality => locality.cityName === cityName);
};

/**
 * Get localities by state NAME (all localities in a state)
 */
export const getLocalitiesByStateName = (stateName) => {
  return LOCALITIES.filter(locality => locality.stateName === stateName);
};

/**
 * Get city code by city NAME (for project code generation)
 */
export const getCityCodeByName = (cityName) => {
  const city = CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.cityCode : 'DXB'; // Default to Dubai
};

/**
 * Get city by NAME
 */
export const getCityByName = (cityName) => {
  return CITIES.find(c => c.name === cityName);
};

/**
 * Get state by NAME
 */
export const getStateByName = (stateName) => {
  return STATES.find(s => s.name === stateName);
};

/**
 * Get country by NAME
 */
export const getCountryByName = (countryName) => {
  return COUNTRIES.find(c => c.name === countryName);
};

/**
 * Get full location path (Country > State > City > Locality)
 */
export const getLocationPath = (localityName, cityName) => {
  const locality = LOCALITIES.find(l => l.name === localityName && l.cityName === cityName);
  if (!locality) return null;

  return {
    country: locality.countryName,
    state: locality.stateName,
    city: locality.cityName,
    locality: locality.name,
    fullPath: `${locality.countryName} > ${locality.stateName} > ${locality.cityName} > ${locality.name}`,
  };
};

// ==================== BACKWARD COMPATIBILITY ====================
// Legacy functions (by code) - for backward compatibility
export const getStatesByCountry = getStatesByCountryName;
export const getCitiesByState = getCitiesByStateName;
export const getLocalitiesByCity = getLocalitiesByCityName;

// Simple city names array
export const CITY_NAMES = CITIES.map(city => city.name);