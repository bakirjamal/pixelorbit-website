"use client";

import { useEffect, useRef } from 'react';

// These static pages use ordinary links, so each navigation gets a fresh document.
// Initialize DOM animations after React has hydrated the server-rendered markup.
export default function PageRuntime({ code }: { code: string }) {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
    return () => script.remove();
  }, [code]);
  return null;
}
