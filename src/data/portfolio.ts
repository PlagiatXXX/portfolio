import type { Project, Skill } from "../types";
import project2Img from "/images/project2.webp";
import project1Img from "/images/project1.webp";
import managerImg from "/images/Manager.webp";

export const projects: Project[] = [
    {
id: 1,
title: "Онлайн магазин",
description: "Современное веб-приложение онлайн магазина, построенное на JavaScript с использованием модульной архитектуры. Приложение позволяет пользователям просматривать товары, фильтровать по цене, искать нужные товары и управлять корзиной покупок.",
technologies: ["JavaScript", "Webpack", "TypeScript", "SCSS"],
github: "https://github.com/PlagiatXXX/online-shop",
image: project2Img,
    },
    {
id: 2,
title: "Реальный проект сайта",
description: "Моя реализация сайта с использованием React и TypeScript",
technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
demo: "https://marso-parfum.com",
image: project1Img,
    },
    {
id: 3,
title: "Менеджер платных подписок SubManager",
description: "Веб-приложение для управления подписками на различные онлайн-сервисы.",
technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "API"],
github: "https://github.com/PlagiatXXX/SubManager",
demo: "https://plagiatxxx.github.io/SubManager/",
image: managerImg,
    },
];

export const skills: Skill[] = [
    {
        name: "React",
        level: 85,
        category: "frontend",
    },
    {
        name: "TypeScript",
        level: 85,
        category: "frontend",
    },
    {
        name: "Node.js",
        level: 85,
        category: "backend",
    },
    {
        name: "SCSS/SASS",
        level: 85,
        category: "frontend",
    },
    {
        name: "Vite",
        level: 85,
        category: "tools",
    },
]