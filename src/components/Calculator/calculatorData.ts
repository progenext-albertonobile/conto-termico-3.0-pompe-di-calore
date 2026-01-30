// Heat pump types based on Tabella 9 - Allegato 2 - D.M. 7 agosto 2025
export interface CiRange {
  maxPower: number; // Power threshold in kW (Infinity for unlimited)
  ci: number; // Coefficient in euro/kWht
}

export interface HeatPumpType {
  id: string;
  name: string;
  regulation: string; // EU regulation reference
  environment: string; // Operating environment type
  commercialName: string;
  ciRanges: CiRange[];
  scopMin: number; // Minimum SCOP for Ecodesign
  etaMin: number; // Minimum ηs for Ecodesign (percentage)
}

export const heatPumpTypes: HeatPumpType[] = [
  {
    id: 'split-aria-aria',
    name: 'Split/Multisplit (aria/aria)',
    regulation: 'UE 206/2012',
    environment: 'A temperatura esterna variabile',
    commercialName: 'Climatizzatori split o multisplit',
    ciRanges: [{ maxPower: 12, ci: 0.070 }],
    scopMin: 2.6,
    etaMin: 110,
  },
  {
    id: 'fixed-double-duct',
    name: 'Fisso doppio condotto (aria/aria)',
    regulation: 'UE 206/2012',
    environment: 'A temperatura esterna variabile',
    commercialName: 'Condizionatori a doppio condotto fisso',
    ciRanges: [{ maxPower: 12, ci: 0.200 }],
    scopMin: 2.6,
    etaMin: 110,
  },
  {
    id: 'vrf-vrv',
    name: 'VRF/VRV (aria/aria)',
    regulation: 'UE 206/2012',
    environment: 'A temperatura esterna variabile',
    commercialName: 'Sistemi VRF/VRV multi-zona',
    ciRanges: [
      { maxPower: 35, ci: 0.150 },
      { maxPower: Infinity, ci: 0.055 },
    ],
    scopMin: 2.6,
    etaMin: 110,
  },
  {
    id: 'rooftop',
    name: 'Rooftop (aria/aria)',
    regulation: 'UE 206/2012',
    environment: 'A temperatura esterna variabile',
    commercialName: 'Unità Rooftop',
    ciRanges: [
      { maxPower: 35, ci: 0.150 },
      { maxPower: Infinity, ci: 0.055 },
    ],
    scopMin: 2.6,
    etaMin: 110,
  },
  {
    id: 'aria-acqua',
    name: 'Aria/Acqua',
    regulation: 'UE 813/2013',
    environment: 'Bassa temperatura (35°C)',
    commercialName: 'Pompe di calore aria-acqua',
    ciRanges: [
      { maxPower: 35, ci: 0.150 },
      { maxPower: Infinity, ci: 0.060 },
    ],
    scopMin: 2.825,
    etaMin: 110,
  },
  {
    id: 'acqua-falda-aria',
    name: 'PdC ad acqua di falda/aria',
    regulation: 'UE 813/2013',
    environment: 'Bassa temperatura (35°C)',
    commercialName: 'Pompe di calore acqua-aria',
    ciRanges: [
      { maxPower: 35, ci: 0.160 },
      { maxPower: Infinity, ci: 0.060 },
    ],
    scopMin: 3.225,
    etaMin: 125,
  },
  {
    id: 'acqua-acqua',
    name: 'Acqua/Acqua (PdC ad acqua di falda)',
    regulation: 'UE 813/2013',
    environment: 'Bassa temperatura (35°C)',
    commercialName: 'Pompe di calore acqua-acqua',
    ciRanges: [
      { maxPower: 35, ci: 0.160 },
      { maxPower: Infinity, ci: 0.060 },
    ],
    scopMin: 3.225,
    etaMin: 125,
  },
  {
    id: 'geotermica-suolo-acqua',
    name: 'Geotermica suolo/acqua (circuito chiuso)',
    regulation: 'UE 813/2013',
    environment: 'Bassa temperatura (35°C)',
    commercialName: 'Pompe di calore geotermiche',
    ciRanges: [
      { maxPower: 35, ci: 0.160 },
      { maxPower: Infinity, ci: 0.060 },
    ],
    scopMin: 3.225,
    etaMin: 125,
  },
  {
    id: 'salamoia-acqua',
    name: 'Salamoia/Acqua (geotermica)',
    regulation: 'UE 813/2013',
    environment: 'Bassa temperatura (35°C)',
    commercialName: 'Pompe di calore a salamoia',
    ciRanges: [
      { maxPower: 35, ci: 0.160 },
      { maxPower: Infinity, ci: 0.060 },
    ],
    scopMin: 3.225,
    etaMin: 125,
  },
];

// Get Ci coefficient based on pump type and power
export function getHeatPumpCi(pumpType: HeatPumpType, powerKw: number): number {
  for (const range of pumpType.ciRanges) {
    if (powerKw <= range.maxPower) {
      return range.ci;
    }
  }
  // Return the last range's Ci if power exceeds all thresholds
  return pumpType.ciRanges[pumpType.ciRanges.length - 1].ci;
}

// Climate zones with Quf values from Tab. 8 All. 2 - D.M. 7 agosto 2025
export interface ClimateZone {
  id: string;
  name: string;
  quf: number; // Hours of use factor (ore/anno)
  examples: string;
}

export const climateZones: ClimateZone[] = [
  {
    id: 'A',
    name: 'Zona A',
    quf: 600,
    examples: 'Lampedusa, Linosa, Porto Empedocle',
  },
  {
    id: 'B',
    name: 'Zona B',
    quf: 850,
    examples: 'Catania, Reggio Calabria, Palermo, Messina',
  },
  {
    id: 'C',
    name: 'Zona C',
    quf: 1100,
    examples: 'Napoli, Bari, Cagliari, Taranto',
  },
  {
    id: 'D',
    name: 'Zona D',
    quf: 1400,
    examples: 'Roma, Firenze, Genova, Ancona',
  },
  {
    id: 'E',
    name: 'Zona E',
    quf: 1700,
    examples: 'Milano, Torino, Bologna, Venezia',
  },
  {
    id: 'F',
    name: 'Zona F',
    quf: 1800,
    examples: 'Belluno, Cuneo, zone montane',
  },
];

// Italian provinces with their climatic zones
export interface Province {
  name: string;
  zone: string;
}

export const provinces: Province[] = [
  { name: "Agrigento", zone: "B" },
  { name: "Alessandria", zone: "E" },
  { name: "Ancona", zone: "D" },
  { name: "Aosta", zone: "F" },
  { name: "Arezzo", zone: "E" },
  { name: "Ascoli Piceno", zone: "D" },
  { name: "Asti", zone: "E" },
  { name: "Avellino", zone: "D" },
  { name: "Bari", zone: "C" },
  { name: "Barletta-Andria-Trani", zone: "C" },
  { name: "Belluno", zone: "F" },
  { name: "Benevento", zone: "D" },
  { name: "Bergamo", zone: "E" },
  { name: "Biella", zone: "E" },
  { name: "Bologna", zone: "E" },
  { name: "Bolzano", zone: "F" },
  { name: "Brescia", zone: "E" },
  { name: "Brindisi", zone: "C" },
  { name: "Cagliari", zone: "C" },
  { name: "Caltanissetta", zone: "B" },
  { name: "Campobasso", zone: "E" },
  { name: "Caserta", zone: "C" },
  { name: "Catania", zone: "B" },
  { name: "Catanzaro", zone: "C" },
  { name: "Chieti", zone: "D" },
  { name: "Como", zone: "E" },
  { name: "Cosenza", zone: "C" },
  { name: "Cremona", zone: "E" },
  { name: "Crotone", zone: "C" },
  { name: "Cuneo", zone: "F" },
  { name: "Enna", zone: "D" },
  { name: "Fermo", zone: "D" },
  { name: "Ferrara", zone: "E" },
  { name: "Firenze", zone: "D" },
  { name: "Foggia", zone: "C" },
  { name: "Forlì-Cesena", zone: "E" },
  { name: "Frosinone", zone: "D" },
  { name: "Genova", zone: "D" },
  { name: "Gorizia", zone: "E" },
  { name: "Grosseto", zone: "D" },
  { name: "Imperia", zone: "C" },
  { name: "Isernia", zone: "E" },
  { name: "L'Aquila", zone: "E" },
  { name: "La Spezia", zone: "D" },
  { name: "Latina", zone: "C" },
  { name: "Lecce", zone: "C" },
  { name: "Lecco", zone: "E" },
  { name: "Livorno", zone: "D" },
  { name: "Lodi", zone: "E" },
  { name: "Lucca", zone: "D" },
  { name: "Macerata", zone: "D" },
  { name: "Mantova", zone: "E" },
  { name: "Massa-Carrara", zone: "D" },
  { name: "Matera", zone: "D" },
  { name: "Messina", zone: "B" },
  { name: "Milano", zone: "E" },
  { name: "Modena", zone: "E" },
  { name: "Monza e Brianza", zone: "E" },
  { name: "Napoli", zone: "C" },
  { name: "Novara", zone: "E" },
  { name: "Nuoro", zone: "D" },
  { name: "Oristano", zone: "C" },
  { name: "Padova", zone: "E" },
  { name: "Palermo", zone: "B" },
  { name: "Parma", zone: "E" },
  { name: "Pavia", zone: "E" },
  { name: "Perugia", zone: "E" },
  { name: "Pesaro e Urbino", zone: "D" },
  { name: "Pescara", zone: "D" },
  { name: "Piacenza", zone: "E" },
  { name: "Pisa", zone: "D" },
  { name: "Pistoia", zone: "D" },
  { name: "Pordenone", zone: "E" },
  { name: "Potenza", zone: "E" },
  { name: "Prato", zone: "D" },
  { name: "Ragusa", zone: "B" },
  { name: "Ravenna", zone: "E" },
  { name: "Reggio Calabria", zone: "B" },
  { name: "Reggio Emilia", zone: "E" },
  { name: "Rieti", zone: "E" },
  { name: "Rimini", zone: "D" },
  { name: "Roma", zone: "D" },
  { name: "Rovigo", zone: "E" },
  { name: "Salerno", zone: "C" },
  { name: "Sassari", zone: "C" },
  { name: "Savona", zone: "D" },
  { name: "Siena", zone: "D" },
  { name: "Siracusa", zone: "B" },
  { name: "Sondrio", zone: "F" },
  { name: "Sud Sardegna", zone: "C" },
  { name: "Taranto", zone: "C" },
  { name: "Teramo", zone: "D" },
  { name: "Terni", zone: "D" },
  { name: "Torino", zone: "E" },
  { name: "Trapani", zone: "B" },
  { name: "Trento", zone: "F" },
  { name: "Treviso", zone: "E" },
  { name: "Trieste", zone: "E" },
  { name: "Udine", zone: "E" },
  { name: "Varese", zone: "E" },
  { name: "Venezia", zone: "E" },
  { name: "Verbano-Cusio-Ossola", zone: "F" },
  { name: "Vercelli", zone: "E" },
  { name: "Verona", zone: "E" },
  { name: "Vibo Valentia", zone: "C" },
  { name: "Vicenza", zone: "E" },
  { name: "Viterbo", zone: "D" },
];

// Get zone by province name
export function getZoneByProvince(provinceName: string): ClimateZone | undefined {
  const province = provinces.find(p => p.name === provinceName);
  if (!province) return undefined;
  return climateZones.find(z => z.id === province.zone);
}

// Calculate incentive based on D.M. 7 agosto 2025 formula
export interface IncentiveResult {
  // Core values
  qu: number; // Total heat produced (Prated × Quf) in kWht
  ei: number; // Incentivized thermal energy in kWht
  kp: number; // Premium coefficient (ηs / ηs,min)
  ci: number; // Valorization coefficient
  quf: number; // Zone usage factor
  annualita: number; // Number of installments (2 or 5)
  
  // Incentive amounts
  annualIncentive: number; // Ia,tot = Ei × Ci
  totalIncentive: number; // I,tot = Ia,tot × Annualita
  
  // Min values for reference
  scopMin: number;
  etaMin: number;
}

export function calculateIncentive(
  pumpType: HeatPumpType,
  zone: ClimateZone,
  powerKw: number,
  scop: number,
  etaEffective: number
): IncentiveResult {
  // Get Quf from zone (Tab. 8)
  const quf = zone.quf;
  
  // Calculate Qu = Prated × Quf (total heat produced)
  const qu = powerKw * quf;
  
  // Get minimum values from pump type
  const scopMin = pumpType.scopMin;
  const etaMin = pumpType.etaMin;
  
  // Calculate kp = ηs / ηs,min (premium coefficient)
  // Capped at a reasonable maximum (e.g., 1.5)
  const kp = Math.min(etaEffective / etaMin, 1.5);
  
  // Calculate Ei = Qu × (1 - 1/SCOP) × kp (incentivized thermal energy)
  const ei = qu * (1 - 1 / scop) * kp;
  
  // Get Ci coefficient based on pump type and power (Tab. 9)
  const ci = getHeatPumpCi(pumpType, powerKw);
  
  // Calculate annual incentive: Ia,tot = Ei × Ci
  const annualIncentive = ei * ci;
  
  // Determine number of installments: 2 if ≤35kW, 5 if >35kW
  const annualita = powerKw <= 35 ? 2 : 5;
  
  // Calculate total incentive: I,tot = Ia,tot × Annualita
  const totalIncentive = annualIncentive * annualita;
  
  return {
    qu: Math.round(qu * 100) / 100,
    ei: Math.round(ei * 100) / 100,
    kp: Math.round(kp * 1000) / 1000,
    ci,
    quf,
    annualita,
    annualIncentive: Math.round(annualIncentive * 100) / 100,
    totalIncentive: Math.round(totalIncentive * 100) / 100,
    scopMin,
    etaMin,
  };
}
