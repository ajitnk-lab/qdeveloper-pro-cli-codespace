'use client';

import { useEffect } from 'react';

export default function FontFix() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Force readable font sizes with !important to override inline styles */
      body, body * { 
        font-size: 18px !important; 
        line-height: 1.6 !important; 
        font-family: var(--font-geist-sans), system-ui, sans-serif !important; 
      }
      h1, h1 * { 
        font-size: 48px !important; 
        font-weight: 700 !important; 
        line-height: 1.2 !important; 
      }
      h2, h2 * { 
        font-size: 36px !important; 
        font-weight: 600 !important; 
        line-height: 1.3 !important; 
      }
      h3, h3 * { 
        font-size: 28px !important; 
        font-weight: 600 !important; 
        line-height: 1.4 !important; 
      }
      h4, h4 * { 
        font-size: 22px !important; 
        font-weight: 600 !important; 
      }
      p, div, span, a, button { 
        font-size: 18px !important; 
        line-height: 1.6 !important; 
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
