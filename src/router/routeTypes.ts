export interface RouteConfig {
  path: string;
  name: string;
  breadcrumb?: string;
}

export const ROUTES: Record<string, RouteConfig> = {
  HOME: { path: '/', name: 'Home' },
  ABOUT: { path: '/about', name: 'About' },
  PROJECTS: { path: '/projects', name: 'Projects' },
  BLOG: { path: '/blog', name: 'Blog' },
  BLOG_POST: { path: '/blog/:slug', name: 'Blog Post', breadcrumb: 'Blog' },
  CONTACT: { path: '/contact', name: 'Contact' },
  NOT_FOUND: { path: '*', name: 'Not Found' },
};

export const getProjectPath = (id: string | number) => `/projects/${id}`;
export const getBlogPostPath = (slug: string) => `/blog/${slug}`;