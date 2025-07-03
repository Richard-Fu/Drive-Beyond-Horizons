// Game-related TypeScript interfaces for better type safety

export interface Game {
  title: string;
  description: string;
  image: string;
  embedUrl: string;
  categories: string[];
  gameType: string;
  rating?: number;
  featured?: boolean;
  playTime?: string;
  pubDate: Date;
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