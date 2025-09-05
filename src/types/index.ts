// All content type definitions for the website

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  techStack: string[];
  authors: string[];
  liveLink?: string;
  githubLink?: string;
  imageUrl?: string;
  featured: boolean;
  status: 'active' | 'completed' | 'in-progress';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  currency: string;
  features: ServiceFeature[];
  popular: boolean;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFeature {
  name: string;
  included: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authors: string[];
  date: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  publishedAt?: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  role: string;
  bio: string;
  imageUrl: string;
  portfolioLink?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutContent {
  id: string;
  story: string;
  mission: string;
  vision: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  submittedAt: string;
  repliedAt?: string;
}

export interface WebsiteRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  features: string[];
  timeline: string;
  images: string[];
  status: 'pending' | 'reviewing' | 'quoted' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  submittedAt: string;
  updatedAt: string;
}

export interface WebsiteInfo {
  id: string;
  companyName: string;
  description: string;
  services: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  updatedAt: string;
  updatedBy: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface WebsiteRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  features: string[];
  timeline: string;
  images: File[];
}

export interface ProjectFormData {
  name: string;
  type: string;
  description: string;
  techStack: string[];
  authors: string[];
  liveLink?: string;
  githubLink?: string;
  imageUrl?: string;
  featured: boolean;
  status: 'active' | 'completed' | 'in-progress';
}

export interface TeamMemberFormData {
  name: string;
  username: string;
  role: string;
  bio: string;
  imageUrl: string;
  portfolioLink?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills: string[];
  isActive: boolean;
}

export interface EventFormData {
  title: string;
  description: string;
  imageUrl: string;
  authors: string[];
  date: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  isActive: boolean;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  readTime: number;
}