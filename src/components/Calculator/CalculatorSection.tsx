import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calculator, Info, TrendingUp, Euro, MapPin, ChevronDown, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  heatPumpTypes,
  climateZones,
  provinces,
  getZoneByProvince,
  getPumpApplicationRequirements,
  calculateIncentive,
} from './calculatorData';

interface CalculatorSectionProps {
  onOpenLeadModal: () => void;
}

const AIR_WATER_ELECTRIC_ID = 'aria-acqua';
const SCOP_TOOLTIP_TEXT =
  'Inserisci lo SCOP "clima average" dalla scheda tecnica del produttore. Radiatori/Ventilconvettori -> 55C (lascia la spunta OFF). Pavimento radiante -> 35C (spunta ON).';

export function CalculatorSection({ onOpenLeadModal }: CalculatorSectionProps) {
  const [selectedPumpId, setSelectedPumpId] = useState<string>(heatPumpTypes[4].id); // Default: Aria/Acqua
  const [selectedProvince, setSelectedProvince] = useState<string>('Bologna');
  const [powerKw, setPowerKw] = useState<number | ''>('');
  const [scop, setScop] = useState<number | ''>('');
  const [etaEffective, setEtaEffective] = useState<number | ''>('');
  const [isLowTemp35, setIsLowTemp35] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: resultRef, isVisible: resultVisible } = useScrollAnimation();

  const invalidate = () => {
    setHasCalculated(false);
    setShowDetails(false);
    setValidationErrors([]);
  };

  // Get selected pump type
  const selectedPump = heatPumpTypes.find(p => p.id === selectedPumpId) || heatPumpTypes[4];
  const isAirWaterElectric = selectedPump.id === AIR_WATER_ELECTRIC_ID;
  const pumpRequirements = getPumpApplicationRequirements(selectedPump, isLowTemp35);

  const handleCalculate = () => {
    const errors: string[] = [];

    if (powerKw === '') {
      errors.push('Inserisci la potenza Prated (kW).');
    }

    if (scop === '') {
      errors.push('Inserisci lo SCOP clima average dalla scheda tecnica.');
    } else if (scop < pumpRequirements.scopMin) {
      errors.push(`SCOP inferiore al minimo Ecodesign (${pumpRequirements.scopMin.toFixed(3)}).`);
    }

    if (etaEffective === '') {
      errors.push('Inserisci eta_s effettivo dalla scheda tecnica.');
    } else if (etaEffective < pumpRequirements.etaMin) {
      errors.push(`eta_s effettivo inferiore al minimo Ecodesign (${pumpRequirements.etaMin}%).`);
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setHasCalculated(false);
      return;
    }

    setValidationErrors([]);
    setHasCalculated(true);
  };

  // Get climate zone based on selected province
  const selectedZone = getZoneByProvince(selectedProvince) || climateZones[4]; // Default to E

  // Calculate results
  const result = calculateIncentive(
    selectedPump,
    selectedZone,
    powerKw === '' ? 0 : powerKw,
    scop === '' ? 0 : scop,
    etaEffective === '' ? 0 : etaEffective,
    {
      scopMin: pumpRequirements.scopMin,
      etaMin: pumpRequirements.etaMin,
    }
  );

  // Power threshold indicator
  const powerThreshold = powerKw !== '' && powerKw <= 35 ? '<= 35 kW' : '> 35 kW';

  return (
    <section id="calculator" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={sectionRef}
          className={`text-center mb-12 lg:mb-16 animate-on-scroll ${sectionVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Calcolo Gratuito
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Calcola il Tuo <span className="gradient-text">Incentivo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scopri quanto puoi risparmiare con il Conto Termico 3.0. Inserisci i dati del tuo impianto e ottieni una stima immediata.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <div className="space-y-6">
            {/* DATI IMPIANTO */}
            <Card className="shadow-bold border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Dati Pompa di Calore
                </CardTitle>
                <CardDescription>Inserisci i dati tecnici della pompa di calore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Heat Pump Type Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="pump-type">Tipo di Pompa di Calore</Label>
                  <Select
                    value={selectedPumpId}
                    onValueChange={(v) => {
                      setSelectedPumpId(v);
                      if (v !== AIR_WATER_ELECTRIC_ID) {
                        setIsLowTemp35(false);
                      }
                      invalidate();
                    }}
                  >
                    <SelectTrigger id="pump-type" className="w-full">
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {heatPumpTypes.map((pump) => (
                        <SelectItem key={pump.id} value={pump.id}>
                          {pump.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{selectedPump.commercialName}</p>
                </div>
                {isAirWaterElectric && (
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="is-low-temp-35"
                        checked={isLowTemp35}
                        onCheckedChange={(checked) => {
                          setIsLowTemp35(checked === true);
                          invalidate();
                        }}
                      />
                      <Label htmlFor="is-low-temp-35" className="cursor-pointer text-sm leading-relaxed">
                        <span> Impianto a bassa Temperatura &lt; 35&nbsp;°C
                        <br />
                        <span className="font-normal text-muted-foreground">
                          (es. Pannelli Radianti a Pavimento)
                        </span>
                      </span>
                      </Label>
                    </div>
                  </div>
                )}

                {/* Province Selection */}
                <div className="space-y-2">
                  <Label htmlFor="province" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Provincia
                  </Label>
                  <Select value={selectedProvince} onValueChange={(v) => { setSelectedProvince(v); invalidate(); }}>
                    <SelectTrigger id="province" className="w-full">
                      <SelectValue placeholder="Seleziona provincia" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {provinces.map((province) => (
                        <SelectItem key={province.name} value={province.name}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Power Input - FREE NUMBER */}
                <div className="space-y-2">
                  <Label htmlFor="power">Potenza Prated (kW)</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="power"
                      type="number"
                      min={1}
                      max={1000}
                      step={0.1}
                      value={powerKw}
                      onChange={(e) => {
                        const next = e.target.value === '' ? '' : Math.max(1, parseFloat(e.target.value) || 1);
                        setPowerKw(next);
                        invalidate();
                      }}
                      className="flex-1"
                    />
                    <Badge variant={powerKw !== '' && powerKw <= 35 ? "secondary" : "default"}>
                      {powerThreshold}
                    </Badge>
                  </div>
                </div>

                {/* SCOP and eta_s min row */}
                <div className="grid grid-cols-2 items-end gap-4">
                  <div className="space-y-2">
                    <div className="flex min-h-5 items-center gap-2">
                      <Label htmlFor="scop">{pumpRequirements.scopLabel}</Label>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex h-4 w-4 items-center justify-center rounded-sm p-0 leading-none text-muted-foreground transition-colors hover:text-foreground"
                              aria-label="Indicazioni SCOP"
                            >
                              <Info className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-xs leading-relaxed">{SCOP_TOOLTIP_TEXT}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="scop"
                      type="number"
                      min={1}
                      max={10}
                      step={0.01}
                      value={scop}
                      onChange={(e) => {
                        const next = e.target.value === '' ? '' : Math.max(1, parseFloat(e.target.value) || 1);
                        setScop(next);
                        invalidate();
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex min-h-5 items-center">
                      <Label htmlFor="eta-min">ηs min Ecodesign (%)</Label>
                    </div>
                    <Input
                      id="eta-min"
                      type="number"
                      value={pumpRequirements.etaMin}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>

                {/* eta_s effective */}
                <div className="space-y-2">
                  <Label htmlFor="eta-effective">ηs effettivo (% da scheda tecnica)</Label>
                  <Input
                    id="eta-effective"
                    type="number"
                    min={1}
                    max={300}
                    step={1}
                    value={etaEffective}
                      onChange={(e) => {
                        const next = e.target.value === '' ? '' : Math.max(1, parseFloat(e.target.value) || 1);
                        setEtaEffective(next);
                        invalidate();
                      }}
                  />
                </div>

                <div className="pt-2">
                  {validationErrors.length > 0 && (
                    <div className="mb-3 space-y-1 rounded-lg border border-destructive/30 bg-destructive/5 p-3" role="alert">
                      {validationErrors.map((error) => (
                        <p key={error} className="text-xs text-destructive">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <Button
                    onClick={handleCalculate}
                    className="w-full gradient-accent text-accent-foreground py-6 text-lg shadow-accent"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Calcola Incentivo
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Premi per visualizzare la stima nel riquadro a destra.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div
            ref={resultRef}
            className={`animate-on-scroll-right ${resultVisible ? 'visible' : ''}`}
          >
            <Card className="shadow-bold border-0 sticky top-24 overflow-hidden">
              {/* Header */}
              <div className="gradient-hero p-6 text-white">
                <CardTitle className="text-xl flex items-center gap-2 text-white">
                  <TrendingUp className="w-6 h-6" />
                  Incentivi Conto Termico 3.0
                </CardTitle>
                <CardDescription className="text-white/80">
                  D.M. 7 agosto 2025
                </CardDescription>
              </div>
              
              <CardContent className="p-6 space-y-6">
                {!hasCalculated ? (
                  <div className="text-center p-6 rounded-xl bg-muted/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      Per visualizzare la stima, premi:
                    </p>
                    <Button
                      onClick={handleCalculate}
                      className="w-full gradient-accent text-accent-foreground py-6 text-lg shadow-accent"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calcola Incentivo
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Main Result - INCENTIVO TOTALE */}
                    <div className="text-center p-6 rounded-xl bg-success/10 border-2 border-success/30">
                      <p className="text-sm text-muted-foreground mb-1">
                        Incentivo Totale ({result.rateErogazione === 1 ? 'rata unica' : `${result.rateErogazione} rate`})
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Euro className="w-8 h-8 text-success" />
                        <span className="text-4xl sm:text-5xl font-bold text-success">
                          {result.totalIncentive.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Secondary Results */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Incentivo Annuo (Ia,tot)</span>
                        <span className="font-semibold">EUR {result.annualIncentive.toLocaleString('it-IT', { minimumFractionDigits: 2 })} /anno</span>
                      </div>
                      <div className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Calore totale (Qu)</span>
                        <span className="font-semibold">{result.qu.toLocaleString('it-IT')} kWht</span>
                      </div>
                      <div className="flex justify-between items-center py-3 px-4 bg-muted/50 rounded-lg">
                        <span className="text-muted-foreground">Energia incentivata (Ei)</span>
                        <span className="font-semibold">{result.ei.toLocaleString('it-IT', { minimumFractionDigits: 2 })} kWht</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Coefficients Section - Collapsible */}
                <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="font-semibold">Fattori e Coefficienti</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                      <Info className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm">
                        Zona Climatica: <span className="font-bold text-primary">{selectedZone.name}</span>
                        <span className="text-muted-foreground"> (Quf = {selectedZone.quf} ore/anno)</span>
                      </span>
                    </div>

                    {!hasCalculated ? (
                      <p className="text-sm text-muted-foreground px-1 pt-2">
                        Premi <span className="font-semibold">Calcola Incentivo</span> per visualizzare i fattori.
                      </p>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">Quf</p>
                            <p className="font-bold text-lg">{result.quf}</p>
                            <p className="text-xs text-muted-foreground">ore/anno</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">Ci</p>
                            <p className="font-bold text-lg">{result.ci.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground">EUR/kWht</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">kp</p>
                            <p className="font-bold text-lg">{result.kp.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground">premialita</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">SCOP min</p>
                            <p className="font-bold text-lg">{result.scopMin.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground">Ecodesign</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">eta_s min</p>
                            <p className="font-bold text-lg">{result.etaMin}%</p>
                            <p className="text-xs text-muted-foreground">Ecodesign</p>
                          </div>
                          <div className="p-3 bg-muted/30 rounded-lg text-center">
                            <p className="text-muted-foreground text-xs">Annualita di calcolo</p>
                            <p className="font-bold text-lg">{result.annualitaCalcolo}</p>
                            <p className="text-xs text-muted-foreground">{powerKw <= 35 ? '<=35kW' : '>35kW'}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* CTA */}
                <div className="space-y-3 pt-4">
                  <Button
                    asChild
                    className="w-full gradient-accent text-accent-foreground py-6 text-lg shadow-accent"
                  >
                    <a
                      href="/downloads/PROGENEXT_Conto_Termico_30_Guida.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Scarica la Guida Gratuita (PDF)
                    </a>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    <span className="block">*Stima indicativa basata su D.M. 7 agosto 2025.</span>
                    <span className="block">Contattaci per una valutazione tecnica specifica.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

