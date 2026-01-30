import { useState } from 'react';
import { X, Download, Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Inserisci un indirizzo email valido');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ email, source: 'guide_download' }]);

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Grazie! Controlla la tua email per scaricare la guida.');
      
      // Reset after delay
      setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error saving lead:', error);
      toast.error('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-3xl p-8 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Icon */}
            <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                Scarica la Guida Gratuita
              </h3>
              <p className="text-muted-foreground">
                Ricevi la nostra guida completa al Conto Termico 3.0 con tutti 
                i dettagli sugli incentivi e le procedure.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 gradient-hero text-primary-foreground shadow-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Scarica la Guida
                  </>
                )}
              </Button>
            </form>

            {/* Privacy */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Inserendo la tua email accetti la nostra{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . Non invieremo spam.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Grazie!</h3>
            <p className="text-muted-foreground">
              Controlla la tua casella email per scaricare la guida.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
