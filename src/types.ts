export interface SiteSettings {
  siteName: string;
  representative: string;
  address: string;
  phone: string;
  email: string;
  naverFormUrl: string;
  mapAddress: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  buttonStyle: 'solid' | 'rounded' | 'pill';
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  isImportant: boolean;
  isPublished: boolean;
  viewCount: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageContent {
  pageId: 'home' | 'company' | 'legalization' | 'apply';
  title: string;
  subtitle: string;
  sections: Record<string, string>;
  updatedAt: string;
}

export interface AdminUser {
  email: string;
  role: 'admin' | 'viewer';
  displayName?: string;
  photoURL?: string;
  lastLogin?: string;
}

export type AppRoute = 
  | '/'
  | '/company'
  | '/legalization'
  | '/notice'
  | `/notice/${string}`
  | '/apply'
  | '/admin/login'
  | '/admin'
  | '/admin/posts'
  | '/admin/pages'
  | '/admin/design'
  | '/admin/settings';
