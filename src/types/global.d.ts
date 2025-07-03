/// <reference types="astro/client" />

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    trackEvent?: (eventName: string, parameters: any) => void;
    trackGamePlay?: (gameName: string) => void;
    trackSearch?: (searchTerm: string) => void;
    trackShare?: (method: string, contentType: string, itemId: string) => void;
    startGame?: () => void;
    startLoadingAnimation?: () => void;
    showGameArea?: () => void;
    showError?: (message: string) => void;
    gameEmbedUrl?: string;
  }
  
  function gtag(...args: any[]): void;
}

export {};