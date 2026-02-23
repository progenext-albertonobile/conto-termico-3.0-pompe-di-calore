import { useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  _options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  return { ref, isVisible: true };
}

export function useCountUp(
  end: number,
  _duration: number = 2000,
  _startOnVisible: boolean = true
) {
  const { ref } = useScrollAnimation<HTMLSpanElement>();
  return { count: end, ref, isVisible: true };
}
