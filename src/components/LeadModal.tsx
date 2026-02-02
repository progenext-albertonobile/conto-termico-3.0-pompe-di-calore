import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, CheckCircle2, Loader2, Mail, FileText, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Email non valida',
        description: 'Per favore inserisci un indirizzo email valido.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert({ email, source: 'pdf_guide' });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: 'Email registrata!',
        description: 'Riceverai la guida nella tua casella di posta.',
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: 'Errore',
        description: 'Si è verificato un errore. Riprova più tardi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <DialogTitle className="text-2xl">Guida Gratuita Conto Termico 3.0</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Scarica la guida completa con tutti i dettagli sugli incentivi, i requisiti e le procedure.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Il tuo indirizzo email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@email.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-6"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-accent text-accent-foreground py-6 text-lg shadow-accent"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Scarica la Guida Gratuita
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>I tuoi dati sono al sicuro. Niente spam, promesso.</span>
              </div>
            </form>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <p className="text-sm font-medium text-foreground">Cosa troverai nella guida:</p>
              {[
                'Tutti i requisiti per accedere agli incentivi',
                'Tabelle con i valori degli incentivi per zona',
                'Checklist documenti necessari',
                'Tempistiche e modalità di erogazione',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <DialogTitle className="text-2xl mb-2">Perfetto!</DialogTitle>
            <DialogDescription className="text-base mb-6">
              Abbiamo inviato la guida al tuo indirizzo email. Controlla la tua casella di posta (anche lo spam!).
            </DialogDescription>
            <Button onClick={handleClose} className="gradient-hero text-primary-foreground">
              Chiudi
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
