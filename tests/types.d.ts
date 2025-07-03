/// <reference types="@playwright/test" />

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    analyticsEvents?: any[];
  }
}

export {};