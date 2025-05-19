'use client';

import { useEffect } from 'react';

export function ViewportHeightSetter() {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return null;
}