import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calculator, Info, TrendingUp, Euro, MapPin, ChevronDown, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  heatPumpTypes, 
  climateZones, 
  provinces, 
  getZoneByProvince, 
  calculateIncentive, 
  type HeatPumpType 
} from './calculatorData';

interface CalculatorSectionProps {
  onOpenLeadModal: () => void;
}

export function CalculatorSection({ onOpenLeadModal }: CalculatorSectionProps) {
  const [selectedPumpId, setSelectedPumpId] = useState<string>(heatPumpTypes[4].id); // Default: Aria/Acqua
  const [selectedProvince, setSelectedProvince] = useState<string>("Bologna");
  const [powerKw, setPowerKw] = useState<number>(10);
  const [scop, setScop] = useState<number>(3.68);
  const [etaEffective, setEtaEffective] = useState<number>(115);
  const [showDetails, setShowDetails] = useState(false);
  
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: resultRef, isVisible: resultVisible } = useScrollAnimation();

  // Get selected pump type
  const selectedPump = heatPumpTypes.find(p => p.id === selectedPumpId) || heatPumpTypes[4];

  // Get climate zone based on selected province
  const selectedZone = getZoneByProvince(selectedProvince) || climateZones[4]; // Default to E

  // Calculate results
  const result = calculateIncentive(selectedPump, selectedZone, powerKw, scop, etaEffective);

  // Power threshold indicator
  const powerThreshold = powerKw <= 35 ? '≤ 35 kW' : '> 35 kW';

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
                  Dati Impianto
                </CardTitle>
                <CardDescription>Inserisci i dati tecnici della pompa di calore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Heat Pump Type Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="pump-type">Tipo di Pompa di Calore</Label>
                  <Select value={selectedPumpId} onValueChange={setSelectedPumpId}>
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

                {/* Province Selection */}
                <div className="space-y-2">
                  <Label htmlFor="province" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Provincia
                  </Label>
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
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
                  
                  {/* Auto-detected climate zone */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">
                      Zona Climatica: <span className="font-bold text-primary">{selectedZone.name}</span>
                      <span className="text-muted-foreground"> (Quf = {selectedZone.quf} ore/anno)</span>
                    </span>
                  </div>
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
                      onChange={(e) => setPowerKw(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="flex-1"
                    />
                    <Badge variant={powerKw <= 35 ? "secondary" : "default"}>
                      {powerThreshold}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {powerKw <= 35 ? '2 rate annuali' : '5 rate annuali'}
                  </p>
                </div>

                {/* SCOP and ηs min row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scop">SCOP (da scheda tecnica)</Label>
                    <Input
                      id="scop"
                      type="number"
                      min={1}
                      max={10}
                      step={0.01}
                      value={scop}
                      onChange={(e) => setScop(Math.max(1, parseFloat(e.target.value) || 1))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eta-min">ηs min Ecodesign (%)</Label>
                    <Input
                      id="eta-min"
                      type="number"
                      value={selectedPump.etaMin}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                {/* ηs effective */}
                <div className="space-y-2">
                  <Label htmlFor="eta-effective">ηs effettivo (% da scheda tecnica)</Label>
                  <Input
                    id="eta-effective"
                    type="number"
                    min={1}
                    max={300}
                    step={1}
                    value={etaEffective}
                    onChange={(e) => setEtaEffective(Math.max(1, parseFloat(e.target.value) || 1))}
                  />
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
                {/* Main Result - INCENTIVO TOTALE */}
                <div className="text-center p-6 rounded-xl bg-success/10 border-2 border-success/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    Incentivo Totale ({result.annualita} annualità)
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
                    <span className="font-semibold">€ {result.annualIncentive.toLocaleString('it-IT', { minimumFractionDigits: 2 })} /anno</span>
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

                {/* Coefficients Section - Collapsible */}
                <Collapsible open={showDetails} onOpenChange={setShowDetails}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="font-semibold">Fattori e Coefficienti</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-2">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">Quf</p>
                        <p className="font-bold text-lg">{result.quf}</p>
                        <p className="text-xs text-muted-foreground">ore/anno</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">Ci</p>
                        <p className="font-bold text-lg">{result.ci.toFixed(3)}</p>
                        <p className="text-xs text-muted-foreground">€/kWht</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">kp</p>
                        <p className="font-bold text-lg">{result.kp.toFixed(3)}</p>
                        <p className="text-xs text-muted-foreground">premialità</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">SCOP min</p>
                        <p className="font-bold text-lg">{result.scopMin.toFixed(3)}</p>
                        <p className="text-xs text-muted-foreground">Ecodesign</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">ηs min</p>
                        <p className="font-bold text-lg">{result.etaMin}%</p>
                        <p className="text-xs text-muted-foreground">Ecodesign</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-xs">Annualità</p>
                        <p className="font-bold text-lg">{result.annualita}</p>
                        <p className="text-xs text-muted-foreground">{powerKw <= 35 ? '≤35kW' : '>35kW'}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* CTA */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={onOpenLeadModal}
                    className="w-full gradient-accent text-accent-foreground py-6 text-lg shadow-accent"
                  >
                    Scarica la Guida Completa
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    *Stima indicativa basata su D.M. 7 agosto 2025. Il calcolo definitivo dipende dalla valutazione tecnica.
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
