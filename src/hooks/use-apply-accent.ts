import { useEffect } from 'react';
import { useWindStore } from '@/store/wind-store';

/** Reflects the accent onto <html> (the theme is a single fixed night). */
export function useApplyAccent(): void {
  const accent = useWindStore((state) => state.settings.accent);
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);
}
