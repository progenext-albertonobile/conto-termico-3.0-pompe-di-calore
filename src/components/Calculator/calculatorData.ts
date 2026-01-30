// Conto Termico 3.0 Calculator Data
// Based on D.M. 7 agosto 2025

// Climate zones with Quf values (heat demand factor)
export interface ClimateZone {
  id: string;
  name: string;
  quf: number; // kWhth/kW
  description: string;
}

export const climateZones: ClimateZone[] = [
  { id: 'A', name: 'Zona A', quf: 600, description: 'Zone più calde (es. Lampedusa)' },
  { id: 'B', name: 'Zona B', quf: 850, description: 'Zone calde (es. Sicilia, Calabria costiera)' },
  { id: 'C', name: 'Zona C', quf: 1100, description: 'Zone temperate (es. Roma, Napoli)' },
  { id: 'D', name: 'Zona D', quf: 1400, description: 'Zone intermedie (es. Firenze, Bologna)' },
  { id: 'E', name: 'Zona E', quf: 1700, description: 'Zone fredde (es. Milano, Torino)' },
  { id: 'F', name: 'Zona F', quf: 2000, description: 'Zone molto fredde (es. zone alpine)' },
];

// Heat pump types with Ci coefficients (valorization factor)
export interface HeatPumpType {
  id: string;
  name: string;
  ci: number; // €/kWhth
  description: string;
  minScop: number;
}

export const heatPumpTypes: HeatPumpType[] = [
  { 
    id: 'aria-aria', 
    name: 'Pompa di calore aria-aria', 
    ci: 0.045, 
    description: 'Climatizzatore inverter con funzione riscaldamento',
    minScop: 3.9
  },
  { 
    id: 'aria-acqua', 
    name: 'Pompa di calore aria-acqua', 
    ci: 0.055, 
    description: 'Per impianti radianti o radiatori',
    minScop: 3.5
  },
  { 
    id: 'acqua-acqua', 
    name: 'Pompa di calore acqua-acqua', 
    ci: 0.065, 
    description: 'Sfrutta calore da falda o corpo idrico',
    minScop: 4.0
  },
  { 
    id: 'geotermica', 
    name: 'Pompa di calore geotermica', 
    ci: 0.070, 
    description: 'Sfrutta calore del terreno con sonde',
    minScop: 4.0
  },
  { 
    id: 'ibrida', 
    name: 'Sistema ibrido (PDC + caldaia)', 
    ci: 0.050, 
    description: 'Pompa di calore con caldaia di backup',
    minScop: 3.5
  },
  { 
    id: 'acs', 
    name: 'Scaldacqua a pompa di calore', 
    ci: 0.040, 
    description: 'Solo per produzione acqua calda sanitaria',
    minScop: 2.6
  },
  { 
    id: 'caldaia-biomassa', 
    name: 'Caldaia a biomassa', 
    ci: 0.045, 
    description: 'Caldaia a pellet, legna o cippato',
    minScop: 0 // Non applicabile
  },
  { 
    id: 'stufa-biomassa', 
    name: 'Stufa/termocamino a biomassa', 
    ci: 0.040, 
    description: 'Stufa a pellet o termocamino',
    minScop: 0
  },
  { 
    id: 'solare-termico', 
    name: 'Impianto solare termico', 
    ci: 0.065, 
    description: 'Pannelli solari per ACS e/o riscaldamento',
    minScop: 0
  },
  { 
    id: 'building-automation', 
    name: 'Building automation', 
    ci: 0.030, 
    description: 'Sistemi di gestione automatica edificio',
    minScop: 0
  },
];

// Italian provinces mapped to climate zones
export interface Province {
  name: string;
  zone: string;
}

export const provinces: Province[] = [
  // Zone A
  { name: 'Lampedusa e Linosa', zone: 'A' },
  // Zone B
  { name: 'Agrigento', zone: 'B' },
  { name: 'Catania', zone: 'B' },
  { name: 'Crotone', zone: 'B' },
  { name: 'Messina', zone: 'B' },
  { name: 'Palermo', zone: 'B' },
  { name: 'Reggio Calabria', zone: 'B' },
  { name: 'Siracusa', zone: 'B' },
  { name: 'Trapani', zone: 'B' },
  // Zone C
  { name: 'Bari', zone: 'C' },
  { name: 'Brindisi', zone: 'C' },
  { name: 'Cagliari', zone: 'C' },
  { name: 'Caserta', zone: 'C' },
  { name: 'Catanzaro', zone: 'C' },
  { name: 'Cosenza', zone: 'C' },
  { name: 'Imperia', zone: 'C' },
  { name: 'Latina', zone: 'C' },
  { name: 'Lecce', zone: 'C' },
  { name: 'Napoli', zone: 'C' },
  { name: 'Oristano', zone: 'C' },
  { name: 'Ragusa', zone: 'C' },
  { name: 'Salerno', zone: 'C' },
  { name: 'Sassari', zone: 'C' },
  { name: 'Taranto', zone: 'C' },
  { name: 'Vibo Valentia', zone: 'C' },
  // Zone D
  { name: 'Ancona', zone: 'D' },
  { name: 'Ascoli Piceno', zone: 'D' },
  { name: 'Avellino', zone: 'D' },
  { name: 'Benevento', zone: 'D' },
  { name: 'Caltanissetta', zone: 'D' },
  { name: 'Chieti', zone: 'D' },
  { name: 'Enna', zone: 'D' },
  { name: 'Fermo', zone: 'D' },
  { name: 'Firenze', zone: 'D' },
  { name: 'Foggia', zone: 'D' },
  { name: 'Forlì-Cesena', zone: 'D' },
  { name: 'Frosinone', zone: 'D' },
  { name: 'Genova', zone: 'D' },
  { name: 'Grosseto', zone: 'D' },
  { name: 'Isernia', zone: 'D' },
  { name: 'La Spezia', zone: 'D' },
  { name: 'Livorno', zone: 'D' },
  { name: 'Lucca', zone: 'D' },
  { name: 'Macerata', zone: 'D' },
  { name: 'Massa-Carrara', zone: 'D' },
  { name: 'Matera', zone: 'D' },
  { name: 'Nuoro', zone: 'D' },
  { name: 'Pesaro e Urbino', zone: 'D' },
  { name: 'Pescara', zone: 'D' },
  { name: 'Pisa', zone: 'D' },
  { name: 'Potenza', zone: 'D' },
  { name: 'Prato', zone: 'D' },
  { name: 'Rimini', zone: 'D' },
  { name: 'Roma', zone: 'D' },
  { name: 'Savona', zone: 'D' },
  { name: 'Siena', zone: 'D' },
  { name: 'Sud Sardegna', zone: 'D' },
  { name: 'Teramo', zone: 'D' },
  { name: 'Terni', zone: 'D' },
  { name: 'Viterbo', zone: 'D' },
  // Zone E
  { name: 'Alessandria', zone: 'E' },
  { name: "L'Aquila", zone: 'E' },
  { name: 'Arezzo', zone: 'E' },
  { name: 'Asti', zone: 'E' },
  { name: 'Bergamo', zone: 'E' },
  { name: 'Biella', zone: 'E' },
  { name: 'Bologna', zone: 'E' },
  { name: 'Brescia', zone: 'E' },
  { name: 'Campobasso', zone: 'E' },
  { name: 'Como', zone: 'E' },
  { name: 'Cremona', zone: 'E' },
  { name: 'Ferrara', zone: 'E' },
  { name: 'Gorizia', zone: 'E' },
  { name: 'Lecco', zone: 'E' },
  { name: 'Lodi', zone: 'E' },
  { name: 'Mantova', zone: 'E' },
  { name: 'Milano', zone: 'E' },
  { name: 'Modena', zone: 'E' },
  { name: 'Monza e della Brianza', zone: 'E' },
  { name: 'Novara', zone: 'E' },
  { name: 'Padova', zone: 'E' },
  { name: 'Parma', zone: 'E' },
  { name: 'Pavia', zone: 'E' },
  { name: 'Perugia', zone: 'E' },
  { name: 'Piacenza', zone: 'E' },
  { name: 'Pordenone', zone: 'E' },
  { name: 'Ravenna', zone: 'E' },
  { name: "Reggio nell'Emilia", zone: 'E' },
  { name: 'Rieti', zone: 'E' },
  { name: 'Rovigo', zone: 'E' },
  { name: 'Torino', zone: 'E' },
  { name: 'Treviso', zone: 'E' },
  { name: 'Trieste', zone: 'E' },
  { name: 'Udine', zone: 'E' },
  { name: 'Varese', zone: 'E' },
  { name: 'Venezia', zone: 'E' },
  { name: 'Verbano-Cusio-Ossola', zone: 'E' },
  { name: 'Vercelli', zone: 'E' },
  { name: 'Verona', zone: 'E' },
  { name: 'Vicenza', zone: 'E' },
  // Zone F
  { name: 'Aosta', zone: 'F' },
  { name: 'Belluno', zone: 'F' },
  { name: 'Bolzano', zone: 'F' },
  { name: 'Cuneo', zone: 'F' },
  { name: 'Sondrio', zone: 'F' },
  { name: 'Trento', zone: 'F' },
];

// Number of annuities based on incentive amount
export const getAnnuities = (totalIncentive: number): number => {
  if (totalIncentive <= 5000) return 1;
  if (totalIncentive <= 15000) return 2;
  if (totalIncentive <= 35000) return 3;
  if (totalIncentive <= 100000) return 4;
  return 5;
};

// Calculate premium coefficient (kp) based on various factors
export interface PremiumFactors {
  isPublicBuilding: boolean;
  isEnergyPoorArea: boolean;
  hasBuildingAutomation: boolean;
  isNZEB: boolean;
}

export const calculatePremium = (factors: PremiumFactors): number => {
  let kp = 1.0;
  
  if (factors.isPublicBuilding) kp += 0.10;
  if (factors.isEnergyPoorArea) kp += 0.05;
  if (factors.hasBuildingAutomation) kp += 0.05;
  if (factors.isNZEB) kp += 0.10;
  
  return Math.min(kp, 1.30); // Maximum 30% premium
};

// Main calculation function
export interface CalculationInput {
  heatPumpType: string;
  ratedPower: number; // kW
  scop: number;
  province: string;
  premiumFactors: PremiumFactors;
}

export interface CalculationResult {
  qu: number; // Total heat (kWhth)
  ei: number; // Incentivized energy (kWhth)
  annualIncentive: number; // €
  totalIncentive: number; // €
  annuities: number;
  annualPayment: number; // €
  maxIncentivePercent: number; // % of typical cost
  climateZone: ClimateZone;
  heatPump: HeatPumpType;
  premiumCoefficient: number;
}

export const calculateIncentive = (input: CalculationInput): CalculationResult | null => {
  // Find heat pump type
  const heatPump = heatPumpTypes.find(hp => hp.id === input.heatPumpType);
  if (!heatPump) return null;

  // Find province and climate zone
  const provinceData = provinces.find(p => p.name === input.province);
  if (!provinceData) return null;

  const climateZone = climateZones.find(z => z.id === provinceData.zone);
  if (!climateZone) return null;

  // Calculate premium coefficient
  const kp = calculatePremium(input.premiumFactors);

  // Calculate Qu (total heat)
  const qu = input.ratedPower * climateZone.quf;

  // Calculate Ei (incentivized energy)
  // For biomass and solar, SCOP doesn't apply
  let ei: number;
  if (['caldaia-biomassa', 'stufa-biomassa', 'solare-termico', 'building-automation'].includes(input.heatPumpType)) {
    ei = qu * kp;
  } else {
    // Standard formula: Ei = Qu × (1 - 1/SCOP) × kp
    const scop = Math.max(input.scop, 1.1); // Prevent division issues
    ei = qu * (1 - 1 / scop) * kp;
  }

  // Calculate annual incentive
  const annualIncentive = ei * heatPump.ci;

  // Calculate total incentive (capped at maximum values per decree)
  const maxIncentivePerKw = 1000; // Simplified cap
  const maxTotalIncentive = input.ratedPower * maxIncentivePerKw;
  const totalIncentive = Math.min(annualIncentive * 2, maxTotalIncentive); // Simplified

  // Get number of annuities
  const annuities = getAnnuities(totalIncentive);

  // Calculate annual payment
  const annualPayment = totalIncentive / annuities;

  // Estimate percentage of typical installation cost
  const typicalCostPerKw = 1500; // Average €/kW
  const typicalTotalCost = input.ratedPower * typicalCostPerKw;
  const maxIncentivePercent = Math.min((totalIncentive / typicalTotalCost) * 100, 65);

  return {
    qu,
    ei,
    annualIncentive,
    totalIncentive,
    annuities,
    annualPayment,
    maxIncentivePercent,
    climateZone,
    heatPump,
    premiumCoefficient: kp,
  };
};

// Format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format number
export const formatNumber = (value: number, decimals = 0): string => {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
