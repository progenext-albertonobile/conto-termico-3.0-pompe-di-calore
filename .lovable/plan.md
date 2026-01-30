

# Calculator Corrections Plan

## Overview
Complete overhaul of the calculator to match the original HTML calculator faithfully, including the proper formula from D.M. 7 agosto 2025 (Conto Termico 3.0).

---

## Changes Required

### 1. Potenza Termica - FREE NUMBER INPUT

**Current:** Dropdown with fixed options
**Required:** Free text input field for any kW value

- Replace `Select` component with `Input` component (type="number")
- Add validation for reasonable range (e.g., 1-1000 kW)
- Show indicator badge: "> 35 kW" or "≤ 35 kW" based on input value
- Affects Ci coefficient selection and number of payment installments (2 vs 5)

---

### 2. Provincia Default - Bologna

**Current:** Default is "Roma"
**Required:** Default should be "Bologna"

- Change initial state from `"Roma"` to `"Bologna"`

---

### 3. Remove Climate Descriptions

**Current:** Zone descriptions include "Clima freddo", "Clima molto freddo", etc.
**Required:** Remove all "Clima" references from zone descriptions

- Update `climateZones` array to have neutral descriptions or just show examples
- Keep zone letter (A, B, C, D, E, F) and examples visible

---

### 4. Tipo di Pompa di Calore - Faithful to Original

**Current:** Button cards with custom types and fixed Ci values
**Required:** Dropdown matching original HTML with dynamic Ci based on power

Based on the official table (Tabella 9 - Allegato 2 - D.M. 7 agosto 2025):

| Tipo | Power Range | Ci (euro/kWht) |
|------|-------------|----------------|
| Split/Multisplit (aria/aria) | ≤ 12 kW | 0.070 |
| Fixed double duct (aria/aria) | ≤ 12 kW | 0.200 |
| VRF/VRV (aria/aria) | 12-35 kW | 0.150 |
| VRF/VRV (aria/aria) | > 35 kW | 0.055 |
| Rooftop (aria/aria) | ≤ 35 kW | 0.150 |
| Rooftop (aria/aria) | > 35 kW | 0.055 |
| Aria/Acqua | ≤ 35 kW | 0.150 |
| Aria/Acqua | > 35 kW | 0.060 |
| PdC ad acqua di falda/aria | ≤ 35 kW | 0.160 |
| PdC ad acqua di falda/aria | > 35 kW | 0.060 |
| Acqua/Acqua (PdC ad acqua di falda) | ≤ 35 kW | 0.160 |
| Acqua/Acqua (PdC ad acqua di falda) | > 35 kW | 0.060 |
| Geotermica suolo/acqua circuito chiuso | ≤ 35 kW | 0.160 |
| Geotermica suolo/acqua circuito chiuso | > 35 kW | 0.060 |
| Salamoia/Acqua (geotermica) | ≤ 35 kW | 0.160 |
| Salamoia/Acqua (geotermica) | > 35 kW | 0.060 |

---

### 5. Add Missing Input Fields

The original calculator has additional technical inputs:

1. **SCOP (da scheda tecnica)** - Seasonal Coefficient of Performance
   - Number input with decimal
   - Default: 3.68 (example)

2. **ηs effettivo (% da scheda tecnica)** - Actual seasonal efficiency
   - Number input (percentage)
   - Default: 115%

3. **ηs min Ecodesign (%)** - Auto-calculated based on pump type
   - Read-only field, auto-updated

---

### 6. Update Calculation Formula

Implement the correct Conto Termico 3.0 formula:

```text
1. Quf = Zone coefficient from Tab. 8 All. 2
   (Zone A: 600, B: 850, C: 1100, D: 1400, E: 1700, F: 1800)

2. Qu = Prated x Quf (Total heat produced)

3. kp = ηs / ηs,min (Premium coefficient, capped at limit)

4. Ei = Qu x (1 - 1/SCOP) x kp (Incentivized thermal energy)

5. Ci = Coefficient from Tab. 9 based on pump type + power

6. Ia,tot = Ei x Ci (Annual incentive in euro)

7. Annualita = 2 (if ≤35kW) or 5 (if >35kW)

8. I,tot = Ia,tot x Annualita (Total incentive)
```

---

### 7. Update Results Display

Match original layout with sections:

**INCENTIVI Section:**
- Incentivo Totale (X annualita)
- Incentivo Annuo (Ia,tot)
- Calore totale (Qu) in kWht
- Energia incentivata (Ei) in kWht

**FATTORI E COEFFICIENTI Section:**
- Quf value with description
- Ci value with description
- kp value with description
- SCOP min with description
- ηs min with description
- Annualita with explanation

**DETTAGLIO CALCOLI Section (optional/collapsible):**
- Step-by-step formula breakdown showing all calculations

---

## Files to Modify

### `src/components/Calculator/calculatorData.ts`

- Redefine `HeatPumpType` interface with power-based Ci lookup
- Add `getHeatPumpCi(pumpTypeId, powerKw)` function
- Update Quf values for climate zones (Tab. 8)
- Add SCOP min and ηs min values per pump type
- Remove "Clima freddo" descriptions from zones
- Remove `powerOptions` array (no longer needed)

### `src/components/Calculator/CalculatorSection.tsx`

- Change province default to "Bologna"
- Replace power dropdown with number input
- Replace pump type cards with dropdown
- Add SCOP and ηs inputs
- Update calculation display to match original
- Add power threshold indicator badge

---

## Technical Details

### New Heat Pump Types Structure

```typescript
interface HeatPumpType {
  id: string;
  name: string;
  regulation: string; // EU regulation reference
  environment: string; // esterno/interno type
  commercialName: string;
  ciRanges: { maxPower: number; ci: number }[];
  scopMin: number;
  etaMin: number;
}
```

### Zone Quf Values (Tab. 8 All. 2)

| Zone | Quf (kWht) |
|------|------------|
| A | 600 |
| B | 850 |
| C | 1100 |
| D | 1400 |
| E | 1700 |
| F | 1800 |

---

## UI Layout (Matching Original)

```text
+------------------------------------------+
|           DATI IMPIANTO                   |
|-------------------------------------------|
| Tipo di Pompa di Calore  [Dropdown    v] |
|                                           |
| Provincia                [Bologna     v] |
| Zona Climatica: Zona E (auto)            |
|                                           |
| Potenza Prated (kW)  [____] > 35 kW      |
|                                           |
| SCOP (da scheda)     |  ηs min Ecodesign |
| [3.68           ]    |  [110        ] %  |
|                                           |
| ηs effettivo (%)                          |
| [115            ]                         |
+------------------------------------------+

+------------------------------------------+
|              INCENTIVI                    |
|-------------------------------------------|
|  INCENTIVO TOTALE (5 annualita)          |
|        156.871,36 euro                    |
|-------------------------------------------|
|  Incentivo Annuo     |   31.374,27 /anno |
|  Calore totale (Qu)  |   686.800 kWht    |
|  Energia (Ei)        |   522.904,55 kWht |
+------------------------------------------+

+------------------------------------------+
|        FATTORI E COEFFICIENTI             |
|-------------------------------------------|
|  Quf    | 1700  | Coeff. zona climatica  |
|  Ci     | 0.060 | Coeff. valorizzazione  |
|  kp     | 1.045 | Coeff. premialita      |
|  SCOP min| 2.825 | SCOP minimo Ecodesign |
|  ηs min | 110%  | Eff. stagionale min    |
|  Annualita | 5  | >35kW: 5 rate          |
+------------------------------------------+
```

---

## Summary of Changes

| Item | Current | After |
|------|---------|-------|
| Potenza Termica | Dropdown (fixed options) | Free number input |
| Default Provincia | Roma | Bologna |
| Zone descriptions | "Clima freddo" etc. | Neutral (just examples) |
| Pump type selection | Button cards | Dropdown |
| Pump types | Custom 5 types | Official 9+ types from Tabella 9 |
| Ci coefficient | Fixed per pump | Dynamic based on power threshold |
| Additional inputs | None | SCOP, ηs effettivo, ηs min |
| Calculation formula | Simplified | Full D.M. 7 agosto 2025 formula |
| Results display | Basic breakdown | Full technical breakdown |

