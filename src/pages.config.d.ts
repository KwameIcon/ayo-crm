// src/pages.config.d.ts
import type { ComponentType, ReactNode } from 'react';

export interface PagesConfig {
  mainPage?: string;
  Pages: Record<string, ComponentType>;
  Layout?: ComponentType<{ currentPageName?: string; children: ReactNode }>;
}

declare module './pages.config.ts' {
  export const PAGES: Record<string, ComponentType>;
  export const pagesConfig: PagesConfig;
}