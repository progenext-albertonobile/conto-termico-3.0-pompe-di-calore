import { useState, useMemo } from 'react';
import { Calculator, Info, TrendingUp, Euro, Calendar, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  heatPumpTypes,
  provinces,
  climateZones,
  calculateIncentive,
  formatCurrency,
  formatNumber,
  type CalculationResult,
  type PremiumFactors,
} from './calculatorData';

interface CalculatorSectionProps {
  onOpenLeadModal: () => void;
}

const CalculatorSection = ({ onOpenLeadModal }: CalculatorSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  // Form state
  const [heatPumpType, setHeatPumpType] = useState('');
  const [ratedPower, setRatedPower] = useState<number>(0);
  const [scop, setScop] = useState<number>(4.0);
  const [province, setProvince] = useState('');
  const [premiumFactors, setPremiumFactors] = useState<PremiumFactors>({
    isPublicBuilding: false,
    isEnergyPoorArea: false,
    hasBuildingAutomation: false,
    isNZEB: false,
  });

  // Calculate result
  const result: CalculationResult | null = useMemo(() => {
    if (!heatPumpType || !province || ratedPower <= 0) return null;

    return calculateIncentive({
      heatPumpType,
      ratedPower,
      scop,
      province,
      premiumFactors,
    });
  }, [heatPumpType, ratedPower, scop, province, premiumFactors]);

  // Get selected heat pump info
  const selectedHeatPump = heatPumpTypes.find(hp => hp.id === heatPumpType);

  // Check if SCOP is applicable
  const scopApplicable = !['caldaia-biomassa', 'stufa-biomassa', 'solare-termico', 'building-automation'].includes(heatPumpType);

  // Get province zone
  const selectedProvince = provinces.find(p => p.name === province);
  const selectedZone = selectedProvince 
    ? climateZones.find(z => z.id === selectedProvince.zone) 
    : null;

  // Sort provinces alphabetically
  const sortedProvinces = [...provinces].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section id="calculator" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Calcolatore
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Calcola il Tuo{' '}
              <span className="text-gradient">Incentivo</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Inserisci i dati del tuo impianto per scoprire quanto puoi ottenere 
              con il Conto Termico 3.0.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Dati Impianto</h3>
                  <p className="text-sm text-muted-foreground">
                    Compila tutti i campi per il calcolo
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Heat Pump Type */}
                <div className="space-y-2">
                  <Label htmlFor="heatPumpType">Tipo di Impianto *</Label>
                  <Select value={heatPumpType} onValueChange={setHeatPumpType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona il tipo di impianto" />
                    </SelectTrigger>
                    <SelectContent>
                      {heatPumpTypes.map((hp) => (
                        <SelectItem key={hp.id} value={hp.id}>
                          {hp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedHeatPump && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {selectedHeatPump.description}
                    </p>
                  )}
                </div>

                {/* Rated Power */}
                <div className="space-y-2">
                  <Label htmlFor="ratedPower">Potenza Nominale (kW) *</Label>
                  <Input
                    id="ratedPower"
                    type="number"
                    min="0"
                    step="0.1"
                    value={ratedPower || ''}
                    onChange={(e) => setRatedPower(parseFloat(e.target.value) || 0)}
                    placeholder="Es. 12"
                  />
                </div>

                {/* SCOP */}
                {scopApplicable && (
                  <div className="space-y-2">
                    <Label htmlFor="scop">SCOP (Coefficiente di Prestazione) *</Label>
                    <Input
                      id="scop"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={scop}
                      onChange={(e) => setScop(parseFloat(e.target.value) || 4.0)}
                      placeholder="Es. 4.5"
                    />
                    {selectedHeatPump && selectedHeatPump.minScop > 0 && (
                      <p className="text-xs text-muted-foreground">
                        SCOP minimo richiesto: {selectedHeatPump.minScop}
                      </p>
                    )}
                  </div>
                )}

                {/* Province */}
                <div className="space-y-2">
                  <Label htmlFor="province">Provincia di Installazione *</Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona la provincia" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {sortedProvinces.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.name} (Zona {p.zone})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedZone && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {selectedZone.description} - Quf: {selectedZone.quf} kWh/kW
                    </p>
                  )}
                </div>

                {/* Premium Factors */}
                <div className="space-y-3">
                  <Label>Maggiorazioni Applicabili</Label>
                  <div className="space-y-2">
                    {[
                      { key: 'isPublicBuilding', label: 'Edificio pubblico (+10%)' },
                      { key: 'isEnergyPoorArea', label: 'Area disagiata energeticamente (+5%)' },
                      { key: 'hasBuildingAutomation', label: 'Building automation integrata (+5%)' },
                      { key: 'isNZEB', label: 'Edificio NZEB (+10%)' },
                    ].map((factor) => (
                      <div key={factor.key} className="flex items-center gap-2">
                        <Checkbox
                          id={factor.key}
                          checked={premiumFactors[factor.key as keyof PremiumFactors]}
                          onCheckedChange={(checked) =>
                            setPremiumFactors((prev) => ({
                              ...prev,
                              [factor.key]: checked,
                            }))
                          }
                        />
                        <label
                          htmlFor={factor.key}
                          className="text-sm cursor-pointer"
                        >
                          {factor.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  {/* Main Result Card */}
                  <div className="glass p-8 rounded-3xl gradient-border">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        Incentivo Totale Stimato
                      </p>
                      <div className="text-5xl font-bold text-gradient mb-2">
                        {formatCurrency(result.totalIncentive)}
                      </div>
                      <p className="text-sm text-success font-medium">
                        Fino al {formatNumber(result.maxIncentivePercent, 0)}% della spesa
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-xl text-center">
                        <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Rate Annuali</p>
                        <p className="font-semibold">{result.annuities}</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-xl text-center">
                        <Euro className="w-5 h-5 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Per Rata</p>
                        <p className="font-semibold">{formatCurrency(result.annualPayment)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="glass p-6 rounded-2xl">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Dettagli Tecnici
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calore totale (Qu)</span>
                        <span className="font-medium">{formatNumber(result.qu, 0)} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Energia incentivata (Ei)</span>
                        <span className="font-medium">{formatNumber(result.ei, 0)} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coefficiente Ci</span>
                        <span className="font-medium">€{result.heatPump.ci}/kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premialità (kp)</span>
                        <span className="font-medium">+{formatNumber((result.premiumCoefficient - 1) * 100, 0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Zona Climatica</span>
                        <span className="font-medium">{result.climateZone.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-accent" />
                      <p className="font-medium">
                        Vuoi una stima più precisa?
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Scarica la nostra guida gratuita con tutti i dettagli sul Conto Termico 3.0 
                      e ricevi una consulenza personalizzata.
                    </p>
                    <Button
                      onClick={onOpenLeadModal}
                      className="w-full gradient-accent text-accent-foreground"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Scarica la Guida Gratuita
                    </Button>
                  </div>
                </>
              ) : (
                /* Empty State */
                <div className="glass p-12 rounded-3xl text-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Calcola il tuo incentivo
                  </h3>
                  <p className="text-muted-foreground">
                    Compila i campi a sinistra per vedere la stima del tuo incentivo 
                    Conto Termico 3.0.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center">
                * Stima indicativa basata sul D.M. 7 agosto 2025. L'incentivo effettivo 
                dipende dalla verifica dei requisiti tecnici e dalla documentazione. 
                Contattaci per una valutazione precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
