export type Skill = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  techStack: string[];
  screenshots: Screenshot[];
  links: { label: string; url: string }[];
};

export type Experience = {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
};
