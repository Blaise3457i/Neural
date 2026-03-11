export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'Image' | 'Video' | 'Audio' | 'Text' | 'Productivity' | 'Misc';
  isFree: boolean;
  image: string;
  imageAlt?: string;
  link: string;
  published?: boolean;
  featured?: boolean;
  seo?: SEOFields;
}

export interface AIPrompt {
  id: string;
  text: string;
  category: 'Text' | 'Image' | 'Video' | 'Audio';
  badge: string;
  outputImage?: string;
  published?: boolean;
  featured?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'AI Art' | 'AI Writing' | 'AI Automation' | 'Marketing';
  thumbnail: string;
  steps?: string[];
  duration?: string;
  published?: boolean;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt?: string;
  date: string;
  trending?: boolean;
  published?: boolean;
  content?: string;
  seo?: SEOFields;
}

export interface AIProvider {
  id: string;
  name: string;
  description: string;
  type: 'Premium' | 'Free/Open';
  logo: string;
  link: string;
}
