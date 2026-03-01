import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "EasyXpense - Expense Tracker",
    description: "Full-stack expense tracking application with real-time analytics, budget management, and data visualization. Built with React and Node.js for seamless financial tracking.",
    tech_stack: ["React", "Node.js", "MongoDB", "Chart.js"],
    github_link: "https://github.com/JagdeepMohanty/easyxpense.git",
    demo_link: "https://easyxpense.netlify.app",
  },
  {
    id: 2,
    title: "FMG Technology Website",
    description: "Modern corporate website with responsive design, dynamic content management, and optimized performance. Features clean UI/UX and fast load times.",
    tech_stack: ["React", "TypeScript", "Tailwind CSS"],
    github_link: "https://github.com/JagdeepMohanty/fmg_technologies.git",
    demo_link: "https://fmgtechnologies.netlify.app",
  },
  {
    id: 3,
    title: "ButterBatter - Food Ordering Platform",
    description: "E-commerce food ordering system with cart management, order tracking, and payment integration. Delivers smooth user experience with real-time updates.",
    tech_stack: ["React", "Node.js", "Express", "MongoDB"],
    github_link: "https://github.com/JagdeepMohanty/BB1.git",
    demo_link: "https://butterbatter.netlify.app",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Professional portfolio with dark theme, smooth animations, and GitHub API integration. Built with React, TypeScript, and Framer Motion for optimal performance.",
    tech_stack: ["React", "TypeScript", "Vite", "Framer Motion"],
    github_link: "https://github.com/JagdeepMohanty/Portfolio",
    demo_link: "https://jagdeepmohanty.netlify.app",
  }
];

export default projects;
