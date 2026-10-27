/**
 * All portfolio content lives here.
 * Edit this file to update name, links, skills, projects and experience.
 */
import { IconName } from '../shared/icon';

export interface Stat { value: number; suffix: string; label: string; }
export interface Fact { icon: IconName; title: string; text: string; }
export interface SkillBar { name: string; level: number; }
export interface SkillGroup { icon: IconName; title: string; text: string; bars?: SkillBar[]; chips?: string[]; }
export type ProjectVisual = 'dashboard' | 'workforce' | 'converter' | 'speed';
export interface Project {
  title: string; meta: string; year: string; description: string; tags: string[];
  visual: ProjectVisual; color: string; link?: string;
}
export interface Job { period: string; role: string; company: string; summary: string; points: string[]; }
export interface ContactLink { icon: IconName; label: string; value: string; href: string; }
/** `topic` must match one of CONTACT_TOPICS so "Discuss this project" can preselect it. */
export interface Service { icon: IconName; title: string; text: string; points: string[]; topic: string; }
export interface Step { icon: IconName; title: string; text: string; }

export const SERVICES: Service[] = [
  {
    icon: 'code', title: 'Angular web applications', topic: 'Web app',
    text: 'Fast, maintainable single-page apps built with Angular, TypeScript and RxJS, from the first commit to production.',
    points: ['Clean, typed architecture', 'Reusable component library', 'REST API integration'],
  },
  {
    icon: 'chart', title: 'Admin dashboards & portals', topic: 'Dashboard',
    text: 'Data-heavy portals that make sense at a glance, with tables, charts, forms and role-based views.',
    points: ['Charts & data tables', 'Reactive forms', 'Role-based access'],
  },
  {
    icon: 'search', title: 'Fast, SEO-friendly websites', topic: 'Website',
    text: 'Lightweight sites and web tools built to load quickly, work on every screen and rank well on search.',
    points: ['SEO best practices', 'Performance tuning', 'Fully responsive'],
  },
  {
    icon: 'wrench', title: 'UI fixes & performance', topic: 'UI fixes',
    text: 'Already have an Angular app? I can fix layout bugs, speed up slow pages and make it feel right on every device.',
    points: ['Bug fixes & refactors', 'Lazy loading & OnPush', 'Responsive fixes'],
  },
];

export const CONTACT_TOPICS = [...SERVICES.map(s => s.topic), 'Other'];

export const PROCESS: Step[] = [
  { icon: 'search', title: 'Discover', text: 'We talk through your goals, users and scope, so we agree on what success looks like.' },
  { icon: 'pen', title: 'Plan & design', text: 'I map out screens, data flow and milestones before writing a single line of code.' },
  { icon: 'code', title: 'Build', text: 'Steady progress with regular updates and working previews you can click through.' },
  { icon: 'rocket', title: 'Launch & support', text: 'Tested on every screen size, deployed, and improved based on real feedback.' },
];

export const PROFILE = {
  name: 'Zeeshan Rasool',
  firstName: 'Zeeshan',
  initials: 'ZR',
  role: 'Angular Developer',
  company: 'Micronatix Technologies',
  roles: ['Angular Developer', 'TypeScript Engineer', 'Front-end Specialist', 'UI Problem Solver'],
  lead: 'I turn complex business workflows into clean, fast and responsive web apps, built with TypeScript, RxJS, Signals and a sharp eye for UI.',
  available: true,
  email: 'zrasool753@gmail.com',
  /** Put your CV PDF in the `public/` folder with this exact file name. Set to '' to hide all CV buttons. */
  cv: 'Zeeshan-Rasool-CV.pdf',
  currentProject: 'eGatePass portal',
};

export const STATS: Stat[] = [
  { value: 15, suffix: '+', label: 'Projects shipped' },
  { value: 3, suffix: '+', label: 'Years with Angular' },
  { value: 100, suffix: '%', label: 'Responsive builds' },
];

/** Big statement in About; words light up as you scroll. Words wrapped in *stars* get the gradient. */
export const STATEMENT =
  "I'm Zeeshan, an *Angular* developer who turns complex business workflows into *fast*, clean and *delightful* web apps that people actually enjoy using.";

export const MARQUEE: string[] = [
  'Angular', 'TypeScript', 'RxJS', 'Signals', 'NgRx', 'Angular Material', 'SCSS',
  'REST APIs', 'Tailwind', 'Figma', 'Git', 'SSR', 'Unit testing', 'SEO',
];

export const ABOUT: string[] = [
  "I'm an Angular developer at <strong>Micronatix Technologies</strong>, where I work on <strong>eGatePass</strong>, a digital gate pass and visitor management platform. I build the Angular portal that admins and security teams use every day.",
  "I care about the details users actually feel: pages that load quickly, forms that don't fight you, dashboards that make sense at a glance, and layouts that hold up on every screen size.",
  'I work closely with backend teams, so I think about the whole feature, from API contracts and data flow to the last pixel on screen.',
];

export const FACTS: Fact[] = [
  { icon: 'zap', title: 'Performance first', text: 'Lazy loading, OnPush change detection and lean bundles by default.' },
  { icon: 'layers', title: 'Clean architecture', text: 'Reusable components, typed services and predictable state.' },
  { icon: 'devices', title: 'Responsive by design', text: 'Every screen tested from phone to ultrawide.' },
  { icon: 'shield', title: 'Security minded', text: 'Experience writing ISO 27001 policy documentation.' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: 'code', title: 'Angular & web', text: 'Where I spend most of my day.',
    bars: [
      { name: 'Angular', level: 95 }, { name: 'TypeScript', level: 90 },
      { name: 'RxJS', level: 85 }, { name: 'HTML / SCSS', level: 92 },
    ],
  },
  {
    icon: 'grid', title: 'Architecture & state', text: 'Keeping large apps predictable.',
    bars: [
      { name: 'Signals', level: 88 }, { name: 'NgRx', level: 82 },
      { name: 'Angular Material', level: 90 }, { name: 'Unit testing', level: 75 },
    ],
  },
  {
    icon: 'wrench', title: 'Tools & workflow', text: 'Everything around the code.',
    chips: ['Angular CLI', 'Reactive Forms', 'Angular Router', 'REST APIs', 'Git', 'Figma',
      'Tailwind', 'Bootstrap', 'SEO', 'Postman', 'VS Code', 'Jira'],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'eGatePass admin portal', meta: 'Micronatix Technologies', year: 'Web portal', visual: 'dashboard', color: '#0071E3',
    description: 'The Angular web portal behind a digital gate pass and visitor management system. Admins issue passes, approve visitors, manage sites and track entries in real time.',
    tags: ['Angular', 'TypeScript', 'RxJS', 'REST API', 'Dashboards'],
  },
  {
    title: 'WorkforcePass', meta: 'Micronatix Technologies', year: 'Web app', visual: 'workforce', color: '#8E5CFF',
    description: 'A workforce access product in the eGatePass family. I built the Angular web prototype on the shared eGatePass design system.',
    tags: ['Angular', 'SCSS', 'Design system'],
  },
  {
    title: 'FileFlip converter', meta: 'Personal product', year: 'Web tool', visual: 'converter', color: '#FF6B3D',
    description: 'A fast file conversion site for PDF, Word, image and icon formats, with a focus on SEO, speed and a simple drag-and-drop flow.',
    tags: ['JavaScript', 'SEO', 'Static site'],
  },
  {
    title: 'Internet speed test', meta: 'Personal product', year: 'Web tool', visual: 'speed', color: '#00A67E',
    description: 'A speed test site for WiFi, LAN and gaming ping checks, with a live gauge and clear results. Lightweight, responsive and built to rank.',
    tags: ['JavaScript', 'Canvas', 'SEO'],
  },
];

export const EXPERIENCE: Job[] = [
  {
    period: 'Present', role: 'Angular Developer', company: 'Micronatix Technologies',
    summary: 'Front-end lead on the eGatePass web portal.',
    points: [
      'Build and maintain the eGatePass Angular web portal used to manage passes, visitors and sites.',
      'Build reusable components, typed services and reactive forms with RxJS and Signals.',
      'Design and prototype WorkforcePass on the shared eGatePass design system.',
      'Contributed to ISO 27001 ISMS policy documentation.',
    ],
  },
  {
    period: 'Ongoing', role: 'Freelance Developer', company: 'Independent',
    summary: 'Client work and my own web products.',
    points: [
      'Deliver Angular web apps and admin dashboards for clients.',
      'Build and run my own SEO-focused web tools: FileFlip and an internet speed test site.',
    ],
  },
];

export const CONTACTS: ContactLink[] = [
  { icon: 'mail', label: 'Email', value: 'zrasool753@gmail.com', href: 'mailto:zrasool753@gmail.com' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/your-profile', href: 'https://www.linkedin.com/' },
  { icon: 'github', label: 'GitHub', value: 'github.com/your-username', href: 'https://github.com/' },
];

export const NAV_LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
