export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  screenshot: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  context: string;
  project?: string;
  projectUrl?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  iconName: 'code' | 'globe' | 'terminal' | 'zap';
  items: SkillItem[];
  accent?: boolean;
}

export interface TimelineEntry {
  year: string;
  label: string;
  detail: string;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  organization: string;
  date: string;
  badge: string;
  summary: string;
  topics: string[];
  verified: boolean;
}

