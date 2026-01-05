export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    github?: string;
    demo?: string;
    image: string;
}

export interface Skill {
    name: string;
    level: number;
    category: 'frontend' | 'backend' | 'tools';
}