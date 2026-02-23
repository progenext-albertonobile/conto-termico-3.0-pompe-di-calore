import { useEffect, useState } from 'react';

/**
 * Hook per bloccare/sbloccare lo scroll del documento
 * Gestisce il padding-right per compensare la scrollbar mancante
 * Previene il layout shift quando si aprono dialog/drawer
 */
export function useScrollLock(isLocked: boolean): void {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    // Calcola la larghezza della scrollbar al primo render
    const calculateScrollbarWidth = () => {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      document.body.appendChild(outer);
      
      const inner = document.createElement('div');
      outer.appendChild(inner);
      
      const width = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode?.removeChild(outer);
      
      setScrollbarWidth(width);
    };

    calculateScrollbarWidth();
  }, []);

  useEffect(() => {
    if (!isLocked) {
      // Sblocca lo scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      return;
    }

    // Blocca lo scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Cleanup: sblocca lo scroll quando il componente si smonta
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLocked, scrollbarWidth]);
}
