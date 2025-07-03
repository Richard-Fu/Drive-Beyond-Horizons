// Game-related TypeScript interfaces for better type safety

export type GameType = 'geography' | 'quiz' | 'puzzle' | 'strategy' | 'action' | 'education' | 'arcade' | 'sports' | 'shooting' | 'survival';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type EmbedType = 'iframe' | 'redirect' | 'internal';
export type Language = 'en' | 'zh' | 'es' | 'fr' | 'de';

export interface Game {
  title: string;
  description: string;
  image?: string;
  embedUrl?: string;
  categories: string[];
  tags: string[];
  gameType: GameType;
  difficulty: Difficulty;
  rating?: number;
  featured: boolean;
  popular: boolean;
  playTime?: string;
  players: string;
  pubDate: Date;
  embedType: EmbedType;
  external: boolean;
  keywords: string[];
  language: Language;
  developer?: string;
  version?: string;
  lastUpdated?: Date;
}

export interface GameCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  rating?: number;
  categories?: string[];
  featured?: boolean;
  playTime?: string;
}

export interface GamePlayerProps {
  title: string;
  description: string;
  image: string;
  embedUrl: string;
  rating?: number;
  category?: string;
  playTime?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  text: string;
  href?: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  timestamp: number;
  likes: number;
  dislikes: number;
  avatar: string;
}